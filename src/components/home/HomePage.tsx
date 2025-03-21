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

  // Funzione per recuperare i task dal backend
  const retrieveTasks = async (): Promise<Task[]> => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("🚨 No token found, user not authenticated!");
      return [];
    }

    try {
      const response = await fetch("http://localhost:8080/api/tasks/user-tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to retrieve tasks");
      }

      const tasks = await response.json();
      console.log("Retrieved tasks from backend:", tasks);
      return tasks;
    } catch (error) {
      console.error("🚨 Error retrieving tasks:", error);
      return [];
    }
  };

  // Carica i task all'avvio della pagina
  useEffect(() => {
    retrieveTasks().then(setTasks);
  }, []);

  // Funzione per salvare un nuovo task
  const saveTask = async (newTask: Omit<Task, "id">) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("🚨 No token found, user not authenticated!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Error saving task");
      }

      const savedTask = await response.json();
      console.log("Saved task:", savedTask);

      // Aggiungi il task alla lista dei task
      setTasks((prevTasks) => [...prevTasks, savedTask]);
    } catch (error) {
      console.error("🚨 Error saving task:", error);
    }
  };

  // Funzione per gestire il click sulla data
  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  // Funzione per chiudere il modal
  const handleCloseModal = () => {
    setSelectedDate(null);
    setTaskToEdit(null);
  };

  // Funzione per annullare l'edit di un task
  const handleCancelEdit = () => {
    setTaskToEdit(null);
  };

  // Funzione per eliminare un task
  const handleDelete = async (taskId: string | undefined) => {
    if (!taskId) return;

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("🚨 No token found, user not authenticated!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error deleting task");
      }

      // Rimuove il task dalla lista
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("🚨 Error deleting task:", error);
    }
  };

  // Funzione per modificare un task
  const handleModify = (taskId: string | undefined) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setTaskToEdit(taskToEdit || null);
  };

  // Funzione per salvare un task modificato
  const handleSaveModifiedTask = async (modifiedTask: Task) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("🚨 No token found, user not authenticated!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${modifiedTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(modifiedTask),
      });

      if (!response.ok) {
        throw new Error("Error updating task");
      }

      const updatedTask = await response.json();
      console.log("Updated task:", updatedTask);

      // Aggiorna la lista dei task con il task modificato
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );

      setTaskToEdit(null); // Chiudi il modal dopo il salvataggio
    } catch (error) {
      console.error("🚨 Error saving modified task:", error);
    }
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
            onCancel={handleCancelEdit}
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
        <div className="d-flex m-5 justify-content-around">
          <ContactsComponent />
        </div>
        <Footer />
      </section>
    </>
  );
};

export default HomePage;
