import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Task } from "../components/TasksFormComponet"; // Import Task type

export interface ModalProps {
  show: boolean;
  onHide: () => void;
  selectedDate: string | null;
  tasks: Task[];
  onSave: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const ModalComponent: React.FC<ModalProps> = ({ tasks = [], ...props }) => {
  // Filter tasks for the selected date
  const filteredTasks = tasks.filter((task) => task.date === props.selectedDate);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.selectedDate ? `Tasks for ${props.selectedDate}` : 'Inserire data'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {filteredTasks.length > 0 ? (
          <ul>
            {filteredTasks.map((task) => (
              <li key={task.id}>
                <p>{task.task}</p>
                {/* Add other task details here if needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
