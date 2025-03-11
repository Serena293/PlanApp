import { Col, Form, Row } from "react-bootstrap";
import "../assets/LoginForm.css";
import { Link } from "react-router-dom";

// import { useState } from "react";

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
  firstValue: string;
  secondValue: string;
  setFirstValue: (value: string) => void;
  setSecondValue: (value: string) => void;
}

const FormComponent = (props: FormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("First Input:", props.firstValue);
    // console.log("Second Input:", props.secondValue);
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
              value={props.firstValue} // Controlled input
              onChange={(e) => props.setFirstValue(e.target.value)}
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
              value={props.secondValue}
              onChange={(e) => props.setSecondValue(e.target.value)}
              required
            />
          </Col>
        </Form.Group>

        <button
          type="submit"
          className="d-flex justify-items-center px-4 w-50 mx-4"
        >
          {props.btnText}
        </button>
      </Form>
      <div>
        <span className="d-felex flex-column">
          {" "}
          Don't have an account?<Link to="/signup"> Sign up</Link>
        </span>
        <Link to="/forgot-password">Forgot password?</Link>
      </div>
    </section>
  );
};

export default FormComponent;
