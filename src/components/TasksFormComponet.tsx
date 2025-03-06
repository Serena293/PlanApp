import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";

const TasksFormComponent = () => {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [isPostIt, setIsPostIt] = useState(false);
  const [details, setDetails] = useState("");

  const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPostIt(e.target.checked);
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails(e.target.value);
  };

  interface Task {
    task: string;
    date: string;
    isPostIt: boolean;
    details: string;
  }

  const [tasks, setTasks] = useState<Task[]>([]);

  const saveTask = (e: React.FormEvent) => {
    e.preventDefault();

    const task: Task = {
      task: taskName,
      date,
      isPostIt,
      details,
    };

    // Update the state with the new task
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);

    // Save the updated tasks array to LocalStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    console.log(task); 
  };

  return (
    <>
      <Form onSubmit={saveTask}>
        <Form.Group
          as={Row}
          className="mb-3 d-flex flex-column"
          controlId="formHorizontalText"
        >
          <Form.Label column sm={2}>
            Task:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter task"
              value={taskName}
              onChange={handleTaskNameChange}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3 d-flex flex-column"
          controlId="formHorizontalDate"
        >
          <Form.Label column sm={2}>
            Date:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              value={date}
              onChange={handleDateChange}
              min={new Date().toISOString().split("T")[0]}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalCheck"
        >
          <Col sm={12} className="d-flex justify-content-between align-items-center">
            <Form.Label className="mb-0">Do you want to create a post it?</Form.Label>
            <Form.Check
              checked={isPostIt}
              onChange={handleCheckboxChange}
            />
          </Col>
        </Form.Group>

        <InputGroup className="mb-3">
          <InputGroup.Text>Details</InputGroup.Text>
          <Form.Control
            as="textarea"
            value={details}
            onChange={handleDetailsChange}
            // disabled={isPostIt}
          />
        </InputGroup>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Save</Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default TasksFormComponent;
