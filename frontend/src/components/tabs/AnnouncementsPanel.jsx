import React from "react";
import { useNavigate } from "react-router-dom";
import "./AnnouncementsPanel.css";
import { FaNewspaper, FaBell, FaFileAlt } from "react-icons/fa";

const AnnouncementsPanel = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="announcements-panel">
      <h2 className="panel-title">Announcements & Updates</h2>
      <p className="panel-subtitle">Choose what you'd like to view</p>

      <div className="announcements-buttons">
        <button
          className="announcement-btn blogs-btn"
          onClick={() => handleNavigation("/blogs")}
        >
          <FaNewspaper className="btn-icon" />
          <span className="btn-text">Blogs</span>
          <span className="btn-description">Read latest blog posts</span>
        </button>

        <button
          className="announcement-btn notices-btn"
          onClick={() => handleNavigation("/notices")}
        >
          <FaBell className="btn-icon" />
          <span className="btn-text">Notices</span>
          <span className="btn-description">Check important notices</span>
        </button>

        <button
          className="announcement-btn articles-btn"
          onClick={() => handleNavigation("/articles")}
        >
          <FaFileAlt className="btn-icon" />
          <span className="btn-text">Articles</span>
          <span className="btn-description">Explore articles</span>
        </button>
        
        <button
          className="announcement-btn articles-btn"
          onClick={() => handleNavigation("/events")}
        >
          <FaFileAlt className="btn-icon" />
          <span className="btn-text">Events</span>
          <span className="btn-description">Explore Events</span>
        </button>
      </div>
    </div>
  );
};

export default AnnouncementsPanel;
