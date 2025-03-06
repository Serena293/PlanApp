import CalendarComponent from "../components/CalenderComponent"
// import FormComponent from "./FormComponet"
import { useState } from "react";
import TasksFormComponent from "./TasksFormComponet";

function HomePage() {
  const [task, setTask] = useState(""); 
  const [date, setDate] = useState("");
  

return(
// Salvare le task --> Form componente
// Aggiungere dot
//Modale dettagli
//Creare componente bacheca

  <>
<CalendarComponent/>
<TasksFormComponent/>

{/* <FormComponent
      formName="Add Task"
      controlFirstId="task"
      firstLabel="Task"
      firstPlaceholder="Enter your task"
      controlSecondId="date"
      secondLabel="Date"
      secondInputType="date"
      secondPlaceholder=""
      btnText="Save Task"
      firstValue={task}
      secondValue={date}
      setFirstValue={setTask} 
      setSecondValue={setDate} 
    />*/}
    
    </> 

)
}

export default HomePage