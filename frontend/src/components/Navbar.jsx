import { Link, useNavigate } from "react-router-dom";
import { GiGraduateCap } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import "./Navbar.css";
import { useApp } from "../context/AppContext";

const Navbar = () => {

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }
  const{user} = useApp();
  return (
    <div className="navbar">
      <div className="logo-section">
        <GiGraduateCap className="logo-icon" />
        <div className="logo-text">
          <span>Campus</span>
          <span>Connect</span>
        </div>
      </div>
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/college">College</Link>
      </div>
      <div className="logout-button">
        {
          user ? <button onClick={logout}>
          <FiLogOut style={{ marginRight: "6px" }} />
          Log out
        </button>  :
         <button onClick={()=> navigate("/login")}>
         <FiLogOut style={{ marginRight: "6px" }} />
         Log In
       </button>
        }
       
      </div>
    </div>
  );
};

export default Navbar;
