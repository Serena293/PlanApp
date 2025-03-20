import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/login/SingUpPage";
import ForgotPassword from "./components/login/ForgotPassword";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsLoggedIn(!!token); // Convert token existence to boolean
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem("jwt", token);
    setIsLoggedIn(true);
  };

  const handleSignUp = (token: string) => {
    localStorage.setItem("jwt", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="d-flex justify-content-around w-100 align-items-center vh-100">
        <Routes>
          {/* Login: Redirect to home if already logged in */}
          <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />} />

          {/* Sign Up: Redirect to home after signing up */}
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/home" /> : <SignUpPage onSignUp={handleSignUp} />} />

          {/* Forgot Password remains accessible */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Home Page: If logged in, show HomePage; if not, redirect to login */}
          <Route path="/home" element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />} />

          {/* Default route: If logged in, go to home; otherwise, go to login */}
          <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
