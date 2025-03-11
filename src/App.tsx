import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SingUpPage'; 
import ForgotPassword from './components/ForgotPassword';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <Router>
      <div className="d-flex justify-content-around w-100 align-items-center vh-100">
        <Routes>
          {/* If logged in, go to HomePage, otherwise redirect to Login */}
          <Route path="/" element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />} />

          {/* Login page */}
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

          {/* SignUp page */}
          <Route path="/signup" element={<SignUpPage />} />

          {/* Reset password */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
