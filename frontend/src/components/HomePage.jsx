import React from 'react';
import './HomePage.css'; // Import the CSS file
import HomeNav from './HomeNav';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <HomeNav/>
      <section className="hero-section">
        <h1 className="hero-title">Welcome to CampusConnect</h1>
        <p className="hero-subtitle">
          Your one-stop hub for campus news, events, collaboration, and more.
        </p>
        <button className="get-started-button">Get Started</button>
      </section>
      <div>
        {/* <img src='/src/assets/150Z_2208.w017.n001.10A.p18.10.jpg'/> */}
      </div>
      <section className="about-section">
        <h2 className="section-title">What is CampusConnect?</h2>
        <p className="section-description">
          CampusConnect is a platform designed to bring students together — through events, forums, shared notes, and more.
        </p>
      </section>

      <section className="features-section">
        <h2 className="section-title">Features</h2>
        <div className="features-grid">
          <div className="feature-card">Events & Announcements</div>
          <div className="feature-card">Discussion Forums</div>
          <div className="feature-card">Study Resources</div>
          <div className="feature-card">Real-Time Chat</div>
          <div className="feature-card">Lost & Found</div>
          <div className="feature-card">Club Activities</div>
        </div>
      </section>
      <section>
        Contact
      </section>
    </div>
  );
};

export default HomePage;
