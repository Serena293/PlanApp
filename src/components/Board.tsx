// import React, { useState } from "react";
import "../assets/Board.css";
import PostItComponent from "../components/PostItComponent";
import { Task } from "./TasksFormComponent";

const Board: React.FC<{
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onModify: (taskId: string) => void;
  onSave: (modifiedTask: Task) => void;
  editingTask: Task | null;

}> = ({ tasks, onDelete, onModify, onSave, editingTask }) => {
  // Filter out the tasks that are marked as PostIts
  const postItTasks = tasks.filter((task) => task.isPostIt === true);
  // console.log(postItTasks)

 

  // console.log(taskToEdit);

  return (
    <section className="postIt-board">
      {postItTasks.length === 0 && (
        <div className="d-flex flex-column">
          <span className="no-tasks-message">Nothing here yet</span>
          <a href="#">Add task</a>
        </div>
      )
      
      
      
      }

      {postItTasks.map((task) => (
       <PostItComponent
       key={task.id}
       tasks={[task]} // Passing task as an array
       onDelete={onDelete}
       onModify={onModify}
       editingTask={editingTask} // Pass editingTask as a prop
       onSave={onSave}
     />
     
       
      ))}
    </section>
  );
};

export default Board;
