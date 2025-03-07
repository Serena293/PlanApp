import { Task } from "./TasksFormComponent";
import "../assets/postIt.css";

interface PostItProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onModify: (taskId: string) => void;
  editingTask: Task | null;
}

const PostItComponent: React.FC<PostItProps> = ({ tasks = [], onDelete, onModify }) => {
  // Filter out tasks that are marked as PostIts
  const postItTasks = tasks.filter((task) => task.isPostIt === true);
  

  return (
    <>
      {postItTasks.length > 0 && (
        postItTasks.map((task) => (
          <div className="postIt-div" key={task.id}>
            <span>{task.date || ""}</span>
            <h3>{task.task}</h3>
            <button className="btn-postIt" onClick={() => onDelete(task.id)}>
              <i className="bi bi-trash3"></i> 
            </button>
            <button className="btn-postIt" onClick={() => onModify(task.id)}>
              <i className="bi bi-pencil-square"></i>
            </button>
          </div>
        ))
      )  }
    </>
  );
};

export default PostItComponent;
