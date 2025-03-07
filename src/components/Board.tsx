import React from "react";
import "../assets/Board.css";
import PostItComponent from "../components/PostItComponent";
import { Task } from "./TasksFormComponent";

const Board: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  // Filter out the tasks that are marked as PostIts
  const postItTasks = tasks.filter((task) => task.isPostIt === true);

  return (
    <section className="postIt-board">
      {/* Show the "Nothing here yet" message only if there are no PostIts */}
      {postItTasks.length === 0 && (
        <div className="d-flex flex-column">
          <span className="no-tasks-message">Nothing here yet</span>
          <a href="#">Add task</a>
        </div>
      )}

      {/* Loop through PostIt tasks and display them */}
      {postItTasks.map((task) => (
        <PostItComponent
          key={task.id}        // Use task's ID as the key for each component
          tasks={[task]}       // Pass the task as an array to PostItComponent
          onDelete={() => {}}  // Implement onDelete function
          onModify={() => {}}  // Implement onModify function
          // onSave={() => {}}    // Implement onSave function
        />
      ))}
    </section>
  );
};

export default Board;
