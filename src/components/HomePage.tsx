import { useState, useEffect } from "react";
import CalendarComponent from "../components/CalenderComponent";
import TasksFormComponent, { Task } from "./TasksFormComponet";
import Board from "./Board";
import ModalComponent from "../components/ModalComponent"; // Import ModalComponent
import "../assets/HomePage.css";

function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // Track selected date

  const retrieveTasks = (): Task[] => {
    return JSON.parse(localStorage.getItem("tasks") || "[]") as Task[];
  };

  useEffect(() => {
    setTasks(retrieveTasks());
  }, []); // Load tasks once when the component mounts

  const saveTask = (newTask: Task) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date); 
  };

  const handleCloseModal = () => {
    setSelectedDate(null); 
  };

  const handleDelete = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <section className="w-100 vh-100 mt-5 d-flex flex-column">
      <div className="d-flex justify-content-around w-100">
        {/* Pass tasks and handleDateClick to CalendarComponent */}
        <CalendarComponent
          taskDates={tasks.map(task => task.date)}
          onDateClick={handleDateClick}
        />
        {/* Pass the saveTask function to TasksFormComponent */}
        <TasksFormComponent onAddTask={saveTask} />
      </div>
      <div className="w-100">
        <Board />
      </div>

      {/* Pass selectedDate and tasks to ModalComponent */}
      <ModalComponent
        show={selectedDate !== null} 
        onHide={handleCloseModal} 
        selectedDate={selectedDate}
        tasks={tasks}
        // onSave={saveTask}
        onDelete={handleDelete} 
      />
    </section>
  );
}

export default HomePage;
