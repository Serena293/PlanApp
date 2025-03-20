import { useState, useEffect } from "react";
import CalendarComponent from "../sharedComponets/CalenderComponent";
import TasksFormComponent, { Task } from "./TasksFormComponent";
import Board from "./Board";
import ModalComponent from "./ModalComponent";
import "../../assets/HomePage.css";
import NavbarComponent from "../sharedComponets/NavbarComponent";
import Footer from "../sharedComponets/FooterComponent";
import ContactsComponent from "./ContactsComponent";


interface HomePageProps {
  onLogout: () => void;
}

const HomePage = ({ onLogout }: HomePageProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  // const [editingTask, setEditingTask] = useState<Task>();

  const retrieveTasks = async (): Promise<Task[]> => {
    const token = localStorage.getItem("token");
    //console.log("📌 Token in localStorage:", token);

    if (!token) {
      console.error("🚨 No token found, user not authenticated!");
      return [];
    }
  
    try {
      const response = await fetch("http://localhost:8080/api/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error("Failed to retrieve tasks");
  
      return await response.json(); 
    } catch (error) {
      console.error("🚨 Error retrieving tasks:", error);
      return []; 
    }
  };
  

  useEffect(() => {
    retrieveTasks().then(setTasks); 
  }, []);
  

  const saveTask = async (newTask: Task) => {

    const token = localStorage.getItem("token"); 
    console.log("📌 Token being sent:", token); // ✅ Debug token
    if (!token) {
      console.error("🚨 No token found, user not authenticated!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(newTask),
      });
  
      if (!response.ok) throw new Error("Failed to save task");
  
      const savedTask = await response.json();
  
      const updatedTasks = [...tasks, savedTask]; // Use response data
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("🚨 Error saving task:", error);
    }
  };
  
  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
    setTaskToEdit(null);
  };


  const handleCancelEdit = () => {
    setTaskToEdit(null);  //todo: make it shorter? make it one fuction with handleCloseModal
  };

  const handleDelete = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleModify = (taskId: string) => {
    // console.log("Current tasks array:", tasks); // Debugging
    // console.log("Clicked Task ID:", taskId); // Debugging
    const taskToEdit = tasks.find((task) => task.id === taskId);
    // console.log("Selected task to edit:", taskToEdit, "home");
    // if (taskToEdit) {
    //   setTaskToEdit(taskToEdit);
    // }
    setTaskToEdit(taskToEdit || null);
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
    <>
      <section className="fluid w-100 vh-100 d-flex flex-column">
        <NavbarComponent onClick={onLogout} />
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
            editingTask={taskToEdit}
            onSave={handleSaveModifiedTask}
            onCancel = {handleCancelEdit}
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
        <div className="d-flex m-5  justify-content-around">
       <ContactsComponent ></ContactsComponent>
       
       </div>
        <Footer/>
      </section>
    </>
  );
};

export default HomePage;
