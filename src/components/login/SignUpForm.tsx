import { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

interface SignUpFormProps {
  onSignUp: (token: string) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setError("❌ Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Registration failed: ${errorText}`);
      }

      const data = await response.json();
      console.log("✅ User registered:", data);

      const token = data.token;
      localStorage.setItem("token", token);
      onSignUp(token); // ✅ Now actually using onSignUp

      navigate("/home");
    } catch (error) {
      console.error("🚨 Registration error:", error);
      setError(error instanceof Error ? error.message : "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Form className="d-flex flex-column" onSubmit={handleRegister}>
        <label>First Name</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} minLength={2} maxLength={25} required />

        <label>Last Name</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} minLength={2} maxLength={25} required />

        <label>Email address</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} minLength={2} maxLength={50} required />

        <label>Username</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} minLength={2} maxLength={25} required />

        <label>Insert password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} minLength={8} maxLength={25} required />

        <label>Insert password again</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} minLength={8} maxLength={25} required />

        {error && <p className="text-danger">{error}</p>}

        <button type="submit" className="my-3" disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </Form>

      <Link to="/login">Already have an account? Log in</Link>
    </section>
  );
};

export default SignUpForm;
