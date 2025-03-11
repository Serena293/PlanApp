import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  return (
    <section>
      <Form className="d-flex flex-column">
        <label>First Name</label>
        <input type="text" min={2} max={25} required />
        <label>Last Name</label>
        <input type="text" min={2} max={25} required />
        <label>Email address</label>
        <input type="email" min={2} max={50} required />
        <label>Insert password</label>
        <input type="password" min={8} max={25} required />
        <label>Insert password again</label>
        <input type="password" min={8} max={25} required />
        <label>Username</label>
        <input type="text" min={2} max={25} required />

        <button type="submit" className="my-3">
          Sign up
        </button>
      </Form>
      <Link to="/login">Already have an account? Log in</Link>
    </section>
  );
};

export default SignUpForm;
