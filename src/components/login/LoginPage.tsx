import { useNavigate } from "react-router-dom"; 
import CalenderComponent from "../sharedComponets/CalenderComponent";
import FormComponent from "./FormComponet";
import { useState } from "react";

interface LoginPageProps {
  onLogin: (token: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) =>  {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ Use navigate from react-router

  // Handle the submit action
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    console.log("Attempting login with username:", username); // Debug login attempt

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      console.log("Login response:", response); // Log the response
      // Set a breakpoint here to inspect the response object
      
      if (!response.ok) {
        throw new Error("Login failed");
      }

      const token = await response.text();
      console.log("Received token:", token); // Log the token received
      onLogin(token)

       // Set a breakpoint here to inspect the token before storing it

      // ✅ Store the token in localStorage
      localStorage.setItem("token", token);
      console.log("✅ Stored token:", localStorage.getItem("token")); // Debug logging

      // ✅ Redirect user after successful login
      console.log("🚀 Navigating to /home...");
      navigate("/home");
      //window.location.reload(); 
    } catch (error) {
      console.error("🚨 Login error:", error);
      alert("❌ Login failed! Check your username and password.");
    }
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
        handleSubmit={handleSubmit} 
      />
    </div>
  );
}

export default LoginPage;
