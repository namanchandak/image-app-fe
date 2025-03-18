import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginProps {
  setAuth: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        username: username.current?.value,
        password: password.current?.value
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setAuth(true);
        navigate("/image");
      } else {
        alert("Invalid login credentials");
      }
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-sm p-6 bg-gray-800 text-white rounded-lg shadow-lg flex flex-col items-center">
      <h2 className="text-2xl font-bold text-blue-400 mb-6">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4 w-full">
        <input
          type="text"
          placeholder="Username"
          ref={username}
          className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg text-white"
        />
        <input
          type="password"
          placeholder="Password"
          ref={password}
          className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg text-white"
        />
        <button type="submit" className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
          Login
        </button>
      </form>
      <p className="mt-4 text-gray-400 text-center">
        Don't have an account?{" "}
        <button onClick={() => navigate("/signup")} className="text-blue-400 hover:underline">
          Sign up
        </button>
      </p>
    </div>
  );
};

export default Login;