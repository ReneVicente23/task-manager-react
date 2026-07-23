import React, { useState } from 'react';
import TaskCard from "./TaskCard";
import TaskInput from './TaskInput';
import './style/TaskCard.css';
import { useEffect } from "react";

type Task = {
    id:number;
    text: string;
    completed: boolean;
};

const API = import.meta.env.VITE_API_URL;

function TaskList() {
    var tsaux=0;
    /*
    const [tasks, setTasks] = useState<Task[]>([
        { text: "Cantar en la ducha", completed: false },
        { text: "OTRO", completed: false }
    ]);*/

    const [tasks, setTasks] = useState<Task[]>([]);

    const gettasks =() =>{
        fetch("${API}/tasks")
        //fetch(import.meta.env.VITE_API_URL + "/tasks")
        .then((response) => response.json())
        .then((data)=> {
            setTasks(data);
        })
      .catch((error) => {
        console.error("error al obtener tareas:", error);
      });
    }

    useEffect(() => {/*
      fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((data)=> {
            setTasks(data);
        })
      .catch((error) => {
        console.error("error al obtener tareas:", error);
      });*/
      gettasks();
    },[]);


/*
     const addTask = (newTask: string) => {
        setTasks([...tasks, { text: newTask, completed: false }]);
    };*/
    const addTask = (taskText:string) => {
        const newTask= {
            id: Date.now(),
            text: taskText,
            completed: false,
        };

        
        fetch("${API}/tasks" /*import.meta.env.VITE_API_URL + "/tasks"*/ ,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        })
        .then((response) => response.json())
        .then((data) =>{
            console.log("tarea creada en back:",data);
            //setTasks([...tasks,data]);
        })
        .catch((error)=>{
            console.error("error al crear:",error);
        });
        gettasks();
    };

    const deleteTask = (indexToDelete: number) => {
        fetch("${API}/tasks/"/*import.meta.env.VITE_API_URL + "/tasks/"*/ +indexToDelete,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => response.json())
        .then((data) =>{
            console.log("ELIMINADA actualizada en back:",data);
            /*
            setTasks(tasks.map((task, index) => 
            index === indexToToggle 
                ? { ...task, completed: !task.completed }
                : task 
            ));*/
            gettasks();
        })
        .catch((error)=>{
            console.error("error al crear:",error);
        });
        
        //setTasks(tasks.filter((_, index) => index !== indexToDelete));
    };

    const toggleComplete = (idaux:number, completedaux:boolean) => {
        const changeTask= {
            id: idaux,
            completed: !completedaux
        };
        fetch("${API}/tasks/"/*import.meta.env.VITE_API_URL + "/tasks/"*/+idaux,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(changeTask),
        })
        .then((response) => response.json())
        .then((data) =>{
            console.log("tarea actualizada en back:",data);
            gettasks();
            /*
            setTasks(tasks.map((task, index) => 
            index === indexToToggle 
                ? { ...task, completed: !task.completed }
                : task 
            ));*/
        })
        .catch((error)=>{
            console.error("error al crear:",error);
        });
        
    };
    /*
    const toggleComplete = (indexToToggle: number) => {
        setTasks(tasks.map((task, index) => 
            index === indexToToggle 
                ? { ...task, completed: !task.completed }
                : task 
        ));
        {console.log(tasks)}
    };*/

    const completedCount = tasks.filter(task => task.completed).length;
    const totalCount = tasks.length;

    return (
        <div>
            <h2>Tasks completed: {completedCount}</h2>
            <h2>Total Tasks: {totalCount}</h2>
            <TaskInput onAddTask={addTask} />
            <ul className='ul'>
                {tasks.map((task, index) => (
                    <TaskCard key={index} id={task.id} text={task.text} onDelete={() => deleteTask(task.id)} completed={task.completed}
                        onToggle={() => toggleComplete(task.id , task.completed)}/>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;