import React, { useState } from "react";
import { loginUser, registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ isLogin, setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const user = await loginUser(username, password);
        setAuthenticated(true);
        navigate("/dashboard");
      } else {
        await registerUser(username, password);
        alert("Registration successful! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">{isLogin ? "Login" : "Register"}</button>
    </form>
  );
};

export default AuthForm;
