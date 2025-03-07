import { useState, useEffect } from "react";
import CalendarComponent from "../components/CalenderComponent";
import TasksFormComponent, { Task } from "./TasksFormComponent";
import Board from "./Board";
import ModalComponent from "../components/ModalComponent";
import "../assets/HomePage.css";

const HomePage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const retrieveTasks = (): Task[] => {
    return JSON.parse(localStorage.getItem("tasks") || "[]") as Task[];
  };

  useEffect(() => {
    setTasks(retrieveTasks());
  }, []);

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
    setTaskToEdit(null);
  };

  const handleDelete = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleModify = (taskId: string) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setTaskToEdit(taskToEdit);
    }
  };

  const handleSaveModifiedTask = (modifiedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === modifiedTask.id ? modifiedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTaskToEdit(null); 
  };

  return (
    <section className="w-100 vh-100 mt-5 d-flex flex-column">
      <div className="d-flex justify-content-around w-100">
        <CalendarComponent
          taskDates={tasks.map((task) => task.date)}
          onDateClick={handleDateClick}
        />
        <TasksFormComponent onAddTask={saveTask} />
      </div>
      <div className="w-100">
        <Board 
        tasks={tasks} 
        onDelete={handleDelete}
        onModify={handleModify}
        onSave={()=>{}}
        />
      </div>

      <ModalComponent
        show={selectedDate !== null}
        onHide={handleCloseModal}
        selectedDate={selectedDate}
        tasks={tasks}
        onDelete={handleDelete}
        onModify={handleModify}
        onSave={handleSaveModifiedTask}
        editingTask={taskToEdit}
      />
    </section>
  );
};

export default HomePage;
