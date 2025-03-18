import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface SignupProps {
  setAuth: (value: boolean) => void;
}

const Signup: React.FC<SignupProps> = ({ setAuth }) => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/signup", {
        username: username.current?.value,
        password: password.current?.value,
        name: name.current?.value
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setAuth(true);
        navigate("/image");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-sm p-6 bg-gray-800 text-white rounded-lg shadow-lg flex flex-col items-center">
      <h2 className="text-2xl font-bold text-green-400 mb-6">Sign Up</h2>
      <form onSubmit={handleSignup} className="space-y-4 w-full">
        <input
          type="text"
          placeholder="Username"
          ref={username}
          className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg text-white"
        />
        <input
          type="text"
          placeholder="Name"
          ref={name}
          className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg text-white"
        />
        <input
          type="password"
          placeholder="Password"
          ref={password}
          className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg text-white"
        />
        <button type="submit" className="w-full p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg">
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-gray-400 text-center">
        Already have an account?{" "}
        <button onClick={() => navigate("/")} className="text-green-400 hover:underline">
          Login here
        </button>
      </p>
    </div>
  );
};

export default Signup;
