import CalenderComponent from "../components/CalenderComponent";
import FormComponent from "../components/FormComponet";
import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="d-flex justify-content-around w-100 align-items-center vh-100">
      <CalenderComponent />
      <FormComponent
            formName="Login"
            controlFirstId="email"
            firstLabel="Email"
            firstPlaceholder="Enter your email"
            controlSecondId="password"
            secondLabel="Password"
            secondInputType="password"
            secondPlaceholder="Enter your password"
            btnText="Login"
            firstValue={email}
            secondValue={password}
            setFirstValue={setEmail}
            setSecondValue={setPassword}
      />
    </div>
  );
}

export default LoginPage;
