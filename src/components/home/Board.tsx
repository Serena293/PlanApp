import React from "react";
import "../../assets/Board.css";
import PostItComponent from "../home/PostItComponent";
import { Task } from "./TasksFormComponent";

const Board: React.FC<{
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onModify: (taskId: string) => void;
  onSave: (modifiedTask: Task) => void;
  onCancel: ()=>void;
  editingTask: Task | null;
}> = ({ tasks, onDelete, onModify, onSave, onCancel,editingTask }) => {

  // Filter out the tasks that are marked as PostIts
  const postItTasks = tasks.filter((task) => task.isPostIt === true);

  // Remove duplicates based on task.id to ensure unique keys
  const uniquePostItTasks = postItTasks.filter((task, index, self) =>
    index === self.findIndex((t) => t.id === task.id)
  );

  return (
    <section className="postIt-board">
      {uniquePostItTasks.length === 0 && (
        <div className="d-flex flex-column ">
          <span className="no-tasks-message" style={{ background: "#C49A6C" }}>
            Nothing here yet
          </span>
          <a href="#" style={{ background: "#C49A6C", color: "#484030" }}>
            Add task
          </a>
        </div>
      )}

      {uniquePostItTasks.map((task) => (
        <PostItComponent
          key={task.id}  // Unique key based on task.id
          tasks={[task]}  // Pass single task in an array
          onDelete={onDelete}
          onModify={onModify}
          editingTask={editingTask}
          onSave={onSave}
          onCancel= {onCancel}
        />
      ))}
    </section>
  );
};

export default Board;
