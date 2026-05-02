import "../Sidebar.css";
import {
  FaUser,         // Profile
  FaChalkboardTeacher, // Classrooms
  FaUserGraduate,  // Students
  FaChalkboard,    // Teachers
  FaLayerGroup,    // Groups
  FaTachometerAlt, // Dashboard
} from "react-icons/fa";

import { useApp } from "../../context/AppContext";

const AdminSide = () => {
  const { tabClick,setTabClick} = useApp();
  
  
  const handleTabClick = (label) => {
    setTabClick(label);
  };

  return (
    <div className="sidebar-container">
      <div className={`features-tabs ${tabClick === "Profile" ? "active-tab" : ""}`} onClick={() => handleTabClick("Profile")}>
        <FaUser /> Profile
      </div>
      <div className={`features-tabs ${tabClick === "Classrooms" ? "active-tab" : ""}`} onClick={() => handleTabClick("Classrooms")}>
        <FaChalkboardTeacher /> Classrooms
      </div>
      <div className={`features-tabs ${tabClick === "Students" ? "active-tab" : ""}`} onClick={() => handleTabClick("Students")}>
        <FaUserGraduate /> Students
      </div>
      <div className={`features-tabs ${tabClick === "Teachers" ? "active-tab" : ""}`} onClick={() => handleTabClick("Teachers")}>
        <FaChalkboard /> Teachers
      </div>
      <div className={`features-tabs ${tabClick === "Groups" ? "active-tab" : ""}`} onClick={() => handleTabClick("Groups")}>
        <FaLayerGroup /> Groups
      </div>
      <div className={`features-tabs ${tabClick === "announcement" ? "active-tab" : ""}`} onClick={() => handleTabClick("announcement")}>
        <FaTachometerAlt /> Annoucements
      </div>
    </div>
  );
};

export default AdminSide;
