import { useState, useEffect } from "react";
import CalendarComponent from "../components/CalenderComponent";
import TasksFormComponent from "./TasksFormComponet";
import Board from "./Board";
import "../assets/HomePage.css";

function HomePage() {
  const [taskDates, setTaskDates] = useState<string[]>([]);

  const retriveTasks = (): { date: string; task: string }[] => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]") as { date: string; task: string }[];
    return tasks; 
  };
  useEffect(() => {
    const tasks = retriveTasks();
    const dates = tasks.map((task) => task.date); 
    setTaskDates(dates);
  }, [taskDates]);
  //re-render the page every time a task is added, there are better approches
  

  return (
    <section className="w-100 vh-100 mt-5 d-flex flex-column">
      <div className="d-flex justify-content-around w-100">
        {/* Pass taskDates to CalendarComponent */}
        <CalendarComponent taskDates={taskDates} />
        <TasksFormComponent />
      </div>
      <div className="w-100">
        <Board />
      </div>
    </section>
  );
}

export default HomePage;
