import { Link, useNavigate } from "react-router-dom";
import { GiGraduateCap } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import "./HomePage.css";

const HomeNav = () => {

  const navigate = useNavigate();
  return (
    <div className="HomeNav">
      <div className="logo-section">
        <GiGraduateCap className="logo-icon" />
        <div className="logo-text">
          <span>Campus</span>
          <span>Connect</span>
        </div>
      </div>
      <div className="button-group">

      <div className="login-button">
        
        <button onClick={console.log("Hello")}>
          Login
        </button>  
      </div>
      <div className="login-button">

        <button onClick={()=> navigate("/login")}>
         Register
        </button>  
      </div>
      </div>
    </div>
  );
};

export default HomeNav;
