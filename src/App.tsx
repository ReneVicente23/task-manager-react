import Header from "./componentes/Header";
import TaskCard from "./componentes/TaskCard";
import TaskInput from "./componentes/TaskInput";
import TaskList from "./componentes/TaskList";
import Footer from "./componentes/Footer";
import { useEffect } from "react";
import { useState } from "react";
/*
type Task = {
    text: string;
    completed: boolean;
};
*/

function App(){
/*
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
      fetch("http://localhost:3000/tasks")
      .then((response) => response.json)
      .then((data)=> {
        setTasks(data);
      })
      .catch((error) => {
        console.error("error al obtener tareas:", error);
      });
    },[]);
*/
  return(
    <div className="div2">
      <Header/>
      <TaskList/>
      <Footer/>
    </div>
  );
}
export default App;