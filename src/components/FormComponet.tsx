import { Col, Form, Row } from "react-bootstrap";
import "../assets/LoginForm.css";
import { useState } from "react";

interface FormProps {
  formName: string;
  controlFirstId: string;
  firstLabel: string;
  firstPlaceholder: string;
  controlSecondId: string;
  secondLabel: string;
  secondInputType: string;
  secondPlaceholder: string;
  btnText: string;
}

const FormComponent = (props: FormProps) => {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //  console.log("Email:", email);
    //  console.log("Password:", password);
    // Add authentication logic here (API call, validation, etc.)
  };

  return (
    <section className="d-flex flex-column">
      <h3 className="text-center">{props.formName}</h3>
      <Form className="d-flex flex-column" onSubmit={handleSubmit}>
        <Form.Group
          as={Row}
          className="mb-3 d-flex flex-column"
          controlId={props.controlFirstId}
        >
          <Form.Label column sm="2">
            {props.firstLabel}
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder={props.firstPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3 d-flex flex-column"
          controlId={props.controlSecondId}
        >
          <Form.Label column sm="2">
            {props.secondLabel}
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type={props.secondInputType}
              placeholder={props.secondPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Col>
        </Form.Group>
        <button className="d-flex justify-items-center px-4 w-50 mx-4 ">
          {props.btnText}
        </button>
      </Form>
    </section>
  );
};

export default FormComponent;
