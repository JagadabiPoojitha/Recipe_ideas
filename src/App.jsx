import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Persist login state
  useEffect(() => {
    const auth = localStorage.getItem("isLoggedIn");
    if (auth === "true") setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <Router>
      <Routes>
        {/* Landing page accessible to all */}
        <Route path="/" element={<Landing />} />

        {/* Login/Register only accessible if logged out */}
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onRegister={handleLogin} />} />
            <Route path="/about" element={<About />} />
          </>
        )}

        {/* Dashboard accessible only if logged in */}
        {isLoggedIn && (
          <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
        )}

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
