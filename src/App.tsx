import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ImagePage from "./pages/ImagePage";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const tokenData = JSON.parse(atob(token.split(".")[1]));
        const expiry = tokenData.exp * 1000;
        if (Date.now() >= expiry) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          navigate("/");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Invalid token format:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">Welcome to Image App</h1>

      {isAuthenticated && (
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg mb-4">
          Logout
        </button>
      )}

      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/image" /> : <Login setAuth={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setAuth={setIsAuthenticated} />} />
        <Route path="/image" element={isAuthenticated ? <ImagePage /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;