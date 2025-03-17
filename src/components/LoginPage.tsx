import CalenderComponent from "../components/CalenderComponent";
import FormComponent from "../components/FormComponet";
import { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handle the submit action
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from reloading the page
    console.log("Form Submitted");

    // You can put your login API call here (fetch/axios etc.)
    console.log("Submitting login with:", username, password);

    // For now, assuming the login is successful, set the user as logged in
    localStorage.setItem("isLoggedIn", "true");
    // Redirect or update login status here
    // For example, navigate to home after successful login
    window.location.href = "/home"; // You can also use react-router's navigate here
  };

  return (
    <div className="d-flex justify-content-around w-100 align-items-center vh-100">
      <CalenderComponent />
      <FormComponent
        formName="Login"
        controlFirstId="text"
        firstLabel="Username"
        firstPlaceholder="Enter your username"
        controlSecondId="password"
        secondLabel="Password"
        secondInputType="password"
        secondPlaceholder="Enter your password"
        btnText="Login"
        firstValue={username}
        secondValue={password}
        setFirstValue={setUsername}
        setSecondValue={setPassword}
        handleSubmit={handleSubmit} // Passing the handleSubmit function
      />
    </div>
  );
}

export default LoginPage;
