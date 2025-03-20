import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


interface SignUpFormProps {
  onSignUp: (token: string) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp }) => {
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  console.log("handleRegister in signUpForm")
    const formData = new FormData(event.currentTarget);
    const userData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      email: formData.get("email") as string,
    };
  
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Registration failed: ${errorText}`);
      }
  
      const data = await response.json();
      console.log("✅ User registered:", data);
  
      // ✅ Store JWT token in localStorage
      const token = data.token;
      localStorage.setItem("token", token);
  
      // ✅ Redirect user to home page after signup
      navigate("/home"); 
    } catch (error) {
      console.error("🚨 Registration error:", error);
      alert(`❌ Registration error: ${error}`);
    }
  };
  

  return (
    <section>
      <Form className="d-flex flex-column" onSubmit={handleRegister}>
        <label>First Name</label>
        <input type="text" minLength={2} maxLength={25} required name="firstName" />

        <label>Last Name</label>
        <input type="text" minLength={2} maxLength={25} required name="lastName" />

        <label>Email address</label>
        <input type="email" minLength={2} maxLength={50} required name="email" />

        <label>Insert password</label>
        <input type="password" minLength={8} maxLength={25} required name="password" />

        <label>Insert password again</label>
        <input type="password" minLength={8} maxLength={25} required name="confirmPassword" />

        <label>Username</label>
        <input type="text" minLength={2} maxLength={25} required name="username" />

        <button type="submit" className="my-3">Sign up</button>
      </Form>
      <Link to="/login">Already have an account? Log in</Link>
    </section>
  );
};

export default SignUpForm;
