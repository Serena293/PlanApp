import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Task } from "../components/TasksFormComponet";
import EditTaskForm from '../components/EditTaskForm';
import { useState } from 'react';

export interface ModalProps {
  show: boolean;
  onHide: () => void;
  selectedDate: string | null;
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onModify: (taskId: string) => void;
  onSave: (modifiedTask: Task) => void;
  editingTask: Task | null;
}

const ModalComponent: React.FC<ModalProps> = ({ tasks = [], editingTask, ...props }) => {
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
        {editingTask ? (
          <EditTaskForm
            task={editingTask}
            onSave={props.onSave}
            onCancel={props.onHide}
          />
        ) : (
          filteredTasks.length > 0 ? (
            <ul>
              {filteredTasks.map((task) => (
                <li key={task.id}>
                  <p>{task.task}</p>
                  <Button onClick={() => props.onDelete(task.id)}>Delete Task</Button>
                  <Button onClick={() => props.onModify(task.id)}>Modify</Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks for this day</p>
          )
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
