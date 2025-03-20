import { Task } from "./TasksFormComponent";
import EditTaskForm from "../home/EditTaskForm";
import "../../assets/postIt.css";

interface PostItProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onModify: (taskId: string) => void;
  editingTask: Task | null;


  onSave: (modifiedTask: Task) => void;
  onCancel: () => void;
}

const PostItComponent: React.FC<PostItProps> = ({ tasks, onDelete, onModify, editingTask, onSave, onCancel }) => {
  // Filter out tasks that are marked as PostIts
  const postItTasks = tasks.filter((task) => task.isPostIt === true);

  // Remove duplicates based on task.id
  // const uniquePostItTasks = postItTasks.filter((task, index, self) =>
  //   index === self.findIndex((t) => t.id === task.id)
  // );

  return (
    <>
      {postItTasks.map((task) => (
        <div className="postIt-div" key={task.id}>

          {editingTask && editingTask.id === task.id ? (
            <EditTaskForm task={editingTask} onSave={onSave} onCancel={onCancel} />
          ) : (
            <>
              <span>{task.date || ""}</span>
              <h3>{task.task}</h3>
              <button className="btn-postIt" onClick={() => onDelete(task.id)}>
                <i className="bi bi-trash3"></i>
              </button>
              <button className="btn-postIt" onClick={() => onModify(task.id)}>
                <i className="bi bi-pencil-square"></i>
              </button>
            </>
          )}
        </div>
      ))}
    </>
  );
};
      
export default PostItComponent;
