require("dotenv").config();
const cors = require("cors");
const express = require("express");
const {PrismaClient} = require("@prisma/client");
const {PrismaPg} = require("@prisma/adapter-pg");
const jwt = require('jsonwebtoken');
const SECRET_KEY = "llavetesttask";

const port = process.env.PORT || 4000 



const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({adapter});

const app = express();
const PORT = 3000;

app.use(express.json()); 
app.use(cors());
/*
let tasks = [
    {id: 1, text: "Study Express", completed: false},
    {id: 2, text: "Build Backend", completed: true}
];*/

const verifyToken = (req:any, res:any, next:any) => { 
// leer header authorization 
// verificar token con jwt.verify() 
// llamar next() 
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    next();
};

app.get("/",(req:any, res:any)=> {
    res.send("Backend is working")
});

app.get("/private", verifyToken, (req:any, res:any) => { 
    res.json({ message: "Acceso permitido" }); 
}); 

app.post("/login",async (req:any, res:any) => { 
// obtener username y password 
// validar credenciales 
// generar token con jwt.sign() 
try{
       
        const data={
            username:req.body.username,
            password:req.body.password,
        }
        
        if(data.username=="usertest" && data.password =="12345"){
            const token = jwt.sign( 
            { username: data.username}, 
            SECRET_KEY, 
            { expiresIn: "1h" } 
            );
            res.json(token);
        }else{
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
        
        
    }catch(error){
        console.error("Error en POST / tasks:",error);
        res.status(500).json({message:"ERROR AL CREAR TOKEN"})
    }
});

app.get("/tasks", async (req:any, res:any)=>{
    //res.json(tasks);
    try{
        const tasks = await prisma.task.findMany({
            orderBy: {
                id: 'asc',
            },
        });
        res.json(tasks);
    }catch(error){
        console.error("Error en GET / tasks:",error);
        res.status(500).json({message:"ERROR AL OBTENER TAREAS"})
    }
});

app.post("/tasks", async (req: any, res: any) => {
    try{
        const newTask = await prisma.task.create({
            data:{
                text:req.body.text,
                completed:false,
            },
        });
        res.json(newTask);
    }catch(error){
        console.error("Error en POST / tasks:",error);
        res.status(500).json({message:"ERROR AL CREAR TAREAS"})
    }

    /*
    console. log("POST /tasks fue llamado");
    console. log("Datos recibidos:", req.body);

    const newTask = {
        id: req.body.id,
        text: req.body.text,
        completed: req.body. completed,
    };

    tasks.push(newTask);

    console. log("Lista actualizada:", tasks);

    res.json(newTask);*/
});

app.put("/tasks/:id", async (req: any, res: any) => {
    try{
        const taskid= Number(req.params.id);
        //console.log(taskid);
        const updatedTask = await prisma.task.update({
            where: {id: taskid},
            data:{
                completed:req.body.completed,
            },
        });
        //console.log(req.body);
        res.json(updatedTask);
    }catch(error){
        console.error("Error en PUT / tasks: ID",error);
        res.status(500).json({message:"ERROR AL ACTUALIZAR TAREAS"})
    }
    /*
    console. log("POST /tasks/toogle fue llamado");
    console. log("Datos recibidos:", req.params);

    const changeTask = {
        id: req.params.id,
    };

    tasks = tasks.map(item => 
        item.id == changeTask.id ? { ...item, completed: (item.completed == true ? false:true ) } : item
    );

    console. log("Lista actualizada:", tasks);

    res.json(changeTask);*/
});

app.delete("/tasks/:id", async (req: any, res: any) => {
    try{
        const taskid= Number(req.params.id);

        await prisma.task.delete({
            where: {id: taskid}
        })
        res.json({message:"DELETED"})
    }catch(error){
        console.error("Error en DELETE / tasks:ID: ",error);
        res.status(500).json({message:"ERROR AL ELIMINAR TAREAS"})
    }

    /*
    console. log("DELETE /tasks/toogle fue llamado");
    console. log("Datos recibidos:", req.params);

    const delTask = {
        id: Number(req.params.id),
    };
    console. log("Datos recibidos:", delTask);
    const indice = tasks.findIndex(u => u.id==delTask.id);
    console. log("indice:", indice);
    tasks=tasks.filter(task => task.id !== delTask.id)

    console. log("Lista actualizada:", tasks);

    res.json(delTask);*/
});
/*
app.post("/tasks", (req:any, res:any) => {
    const newTask = {
        id: req.body.id,
        title: req.body.title,
        completed: req.body.completed
    };
    tasks.push(newTask);
    res.json(newTask);
});*/


app.listen(PORT, ()=>{
    console.log('server running on PORT ${port}');
});