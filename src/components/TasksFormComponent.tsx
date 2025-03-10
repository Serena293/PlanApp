import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export interface Task {
  id: string;
  task: string;
  date: string;
  isPostIt: boolean;
  details: string;
}

interface TasksFormComponentProps {
  onAddTask: (task: Task) => void;
}

const TasksFormComponent = ({ onAddTask }: TasksFormComponentProps) => {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [isPostIt, setIsPostIt] = useState(false);
  const [details, setDetails] = useState("");

  const saveTask = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      id: uuidv4(),
      task: taskName,
      date,
      isPostIt,
      details,
    };

    onAddTask(newTask); 

    setTaskName("");
    setDate("");
    setIsPostIt(false);
    setDetails("");
  };

  return (
    <Form onSubmit={saveTask}>
      <Form.Group as={Row} className="mb-3 d-flex flex-column" controlId="formHorizontalText">
        <Form.Label column sm={2}>Task:</Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="Enter task" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3 d-flex flex-column" controlId="formHorizontalDate">
        <Form.Label column sm={2}>Date:</Form.Label>
        <Col sm={10}>
          <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
        <Col sm={12} className="d-flex justify-content-between align-items-center">
          <Form.Label className="mb-0">Do you want to create a post-it?</Form.Label>
          <Form.Check checked={isPostIt} onChange={(e) => setIsPostIt(e.target.checked)} />
        </Col>
      </Form.Group>

      <InputGroup className="mb-3">
        <InputGroup.Text>Details</InputGroup.Text>
        <Form.Control as="textarea" value={details} onChange={(e) => setDetails(e.target.value)} />
      </InputGroup>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
        <Button type="submit" style={{ backgroundColor: '#C49A6C' }}>Save</Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default TasksFormComponent;
