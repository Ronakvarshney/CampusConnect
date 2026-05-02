import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApp } from "../../context/AppContext";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const { setAdmin } = useApp();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "Student",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role) => {
    setCredentials((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials
      );
      const { success, token, user } = response.data;

      if (success) {
        localStorage.setItem("token", token);
        localStorage.setItem("isloggedIn", true);

        if (credentials.role === "Admin") {
          setAdmin(user);
          toast.success("Admin Login successful!");
          setTimeout(() => navigate(`/admin/${user.id}`), 500);
        } else {
          localStorage.setItem("user", JSON.stringify(user));
          toast.success("Login successful!");
          setTimeout(() => navigate("/"), 500);
        }
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Brand */}
        <div className="login-brand">
          <span className="login-brand__mark">CC</span>
          <span className="login-brand__name">CampusConnect</span>
        </div>

        {/* Title */}
        <h2 className="login-title">Welcome back</h2>
        <p className="login-subtitle">Sign in to your account to continue</p>

        <form onSubmit={handleSubmit} className="login-form">

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <span className="input-icon">✉</span>
              <input
                id="email"
                type="email"
                name="email"
                className="has-icon"
                value={credentials.email}
                onChange={handleChange}
                required
                placeholder="you@college.edu"
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                id="password"
                type="password"
                name="password"
                className="has-icon"
                value={credentials.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Role — pill selector */}
          <div className="form-group">
            <label>Sign in as</label>
            <div className="role-group">
              {["Student", "Teacher", "Admin"].map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`role-pill ${credentials.role === r ? "active" : ""}`}
                  onClick={() => handleRoleSelect(r)}
                >
                  {r === "Student" ? "🎓 " : r === "Teacher" ? "📖 " : "🛡 "}
                  {r}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="login-button">
            Sign In →
          </button>
        </form>

        <div className="login-footer">
          Don't have an account?
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;