import { Col, Form, Row } from "react-bootstrap";
import  "../assets/LoginForm.css";
import { useState } from "react";

const FormComponent = () => {

   // State for form inputs
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
 
   // Handle form submission
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     console.log("Email:", email);
     console.log("Password:", password);
     // Add authentication logic here (API call, validation, etc.)
   }


  return (
    <section className="d-flex flex-column">

 <h3 className="text-center">Log in</h3>
    <Form className="d-flex flex-column" onSubmit={handleSubmit} >
      <Form.Group as={Row} className="mb-3 d-flex flex-column" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control   placeholder="email@example.com" onChange={(e) => setEmail(e.target.value)}/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3 d-flex flex-column" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="10">
          <Form.Control type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} required />
        </Col>
      </Form.Group>
      <button className="d-flex justify-items-center px-4 w-50 mx-4 ">Log in</button>
    </Form>

    </section>
  );
};

export default FormComponent;
