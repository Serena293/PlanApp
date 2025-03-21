import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/login/SignUpPage"; // ✅ Fixed typo
import ForgotPassword from "./components/login/ForgotPassword";
import PrivateRoute from "./PrivateRoutes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const handleSignUp = (token: string) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="d-flex justify-content-around w-100 align-items-center vh-100">
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/home" /> : <SignUpPage onSignUp={handleSignUp} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ✅ Cleaner Protected Route Handling */}
          <Route element={<PrivateRoute isAuthenticated={isLoggedIn} />}>
            <Route path="/home" element={<HomePage onLogout={handleLogout} />} />
          </Route>

          <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
