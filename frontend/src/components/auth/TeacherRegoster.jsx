import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useApp } from "../../context/AppContext";
import "./auth.css";

const TeacherRegister = () => {
  const [teacher, setTeacher] = useState({
    name: "",
    teacher_id: "",
    email: "",
    contactno: "",
    password: "",
    qualification: "",
    designation: "",
    college: "",
  });

  const [colleges, setColleges] = useState([]);
  const navigate = useNavigate();
  const { setUser } = useApp();

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/allColleges"
        );
        setColleges(response.data.data);
      } catch (error) {
        toast.error("Failed to load colleges");
      }
    };
    fetchColleges();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/teacherRegister",
        teacher
      );
      if (response.status === 201) {
        toast.success("Teacher registered successfully!");
        localStorage.setItem("user", JSON.stringify(response.data.teacher));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isloggedIn", true);
        setUser(response.data.teacher);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-box">
        <h2 className="register-title">Teacher Registration</h2>

        <form onSubmit={handleSubmit} className="form-grid">

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={teacher.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Teacher ID</label>
            <input
              type="text"
              name="teacher_id"
              value={teacher.teacher_id}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={teacher.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              name="contactno"
              value={teacher.contactno}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={teacher.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Qualification</label>
            <input
              type="text"
              name="qualification"
              value={teacher.qualification}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Designation</label>
            <input
              type="text"
              name="designation"
              value={teacher.designation}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>College</label>
            <select
              name="college"
              value={teacher.college}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select a college</option>
              {colleges.map((college, index) => (
                <option key={index} value={college._id}>
                  {college.name} - {college.code}
                </option>
              ))}
            </select>
          </div>

          <div className="form-button">
            <button type="submit" className="submit-btn">
              Register
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TeacherRegister;