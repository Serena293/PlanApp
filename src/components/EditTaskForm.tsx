import React, { useState, useEffect } from "react";
import { Task } from "./TasksFormComponent";

interface EditTaskFormProps {
  task: Task | null;
  onSave: (task: Task) => void;
  onCancel: () => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onSave, onCancel }) => {
  const [editedTask, setEditedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (task) {
      setEditedTask(task);
    }
  }, [task]);

  if (!editedTask) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTask({ ...editedTask, task: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedTask) {
      onSave(editedTask);
    }
  };

  return (
    <div>
      <h4>Edit Task</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editedTask.task}
          onChange={handleChange}
        />
        {/* Add other fields if needed */}
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditTaskForm;
