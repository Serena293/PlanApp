import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SingUpPage'; 
import ForgotPassword from './components/ForgotPassword';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Check if user is logged in when the component mounts
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <Router>
      <div className="d-flex justify-content-around w-100 align-items-center vh-100">
        <Routes>
          {/* If not logged in, redirect to login page */}
          <Route 
            path="/" 
            element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
          
          {/* Login page */}
          <Route 
            path="/login" 
            element={<LoginPage onLogin={handleLogin} />} 
          />

          {/* SignUp page */}
          <Route path="/signup" element={<SignUpPage />} />

          {/* Forgot password page */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Home page, only accessible if logged in */}
          <Route 
            path="/home" 
            element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <Navigate to="/home" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
