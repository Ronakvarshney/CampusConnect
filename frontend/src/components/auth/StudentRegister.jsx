import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './register.css';

const fieldConfig = [
  { name: 'name',      label: 'Full Name',       type: 'text',     icon: '👤', placeholder: 'John Doe' },
  { name: 'rollno',    label: 'Roll Number',      type: 'text',     icon: '🎫', placeholder: 'e.g. 2301CS042' },
  { name: 'email',     label: 'Email Address',    type: 'email',    icon: '✉',  placeholder: 'you@college.edu' },
  { name: 'contactNo', label: 'Contact Number',   type: 'text',     icon: '📞', placeholder: '+91 98765 43210' },
  { name: 'password',  label: 'Password',         type: 'password', icon: '🔒', placeholder: 'Min. 8 characters' },
  { name: 'year',      label: 'Academic Year',    type: 'text',     icon: '📅', placeholder: 'e.g. 2' },
  { name: 'batch',     label: 'Batch',            type: 'text',     icon: '🏷',  placeholder: 'e.g. 2023–2027' },
];

const StudentRegister = () => {
  const [user, setUser] = useState({
    name: '', rollno: '', email: '',
    contactNo: '', password: '',
    year: '', batch: '', college: '',
  });

  const [colleges, setColleges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/allColleges');
        setColleges(response.data.data);
      } catch (error) {
        console.log(error);
        toast.error('Failed to load colleges');
      }
    };
    fetchColleges();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/stuRegister', user);
      if (response.status === 201) {
        toast.success('Registration successful!');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="student-register-container">
      <form className="student-register-form" onSubmit={handleSubmit}>

        {/* Brand */}
        <div className="register-brand">
          <span className="register-brand__mark">CC</span>
          <span className="register-brand__name">CampusConnect</span>
        </div>

        {/* Title */}
        <h2 className="student-register-heading">Create your account</h2>
        <p className="student-register-subheading">Join your campus community in seconds</p>

        {/* ── Personal Info ── */}
        <p className="form-section-label">Personal Info</p>
        <div className="form-grid">
          {fieldConfig.map(({ name, label, type, icon, placeholder }) => (
            <div className="form-group" key={name}>
              <label htmlFor={name}>{label}</label>
              <div className="input-wrapper">
                <span className="input-icon">{icon}</span>
                <input
                  id={name}
                  type={type}
                  name={name}
                  className="form-input"
                  value={user[name]}
                  onChange={handleChange}
                  required
                  placeholder={placeholder}
                />
              </div>
            </div>
          ))}

          {/* College — full width */}
          <div className="form-group full-width">
            <label htmlFor="college">College</label>
            <div className="input-wrapper select-wrapper">
              <span className="input-icon">🏛</span>
              <select
                id="college"
                name="college"
                className="form-select"
                value={user.college}
                onChange={handleChange}
                required
              >
                <option value="">Select your college</option>
                {colleges.map((college, index) => (
                  <option key={index} value={college._id}>
                    {college.name} — {college.code} — {college.address}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="form-button-group">
          <button type="submit" className="submit-button">
            Register →
          </button>
        </div>

        <div className="register-footer">
          Already have an account?
          <Link to="/login">Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default StudentRegister;