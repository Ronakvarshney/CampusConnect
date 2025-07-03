import React, { useEffect, useState } from 'react';
import './EventPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectrole, setselectrole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events/eventsfetch");
        setEvents(res.data.events);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchEvents();
  }, []);

  // Filter events by selected role
  const filteredEvents = selectrole
    ? events.filter(event => event.eventfor === selectrole)
    : events;

  return (
    <div className="events-container">
      <div className="filter-buttons">
        <button onClick={() => setselectrole("Admin")}>Admin's Events</button>
        <button onClick={() => setselectrole("Teacher")}>Teacher's Events</button>
        <button onClick={() => setselectrole("Student")}>Student's Events</button>
        <button onClick={() => setselectrole(null)}>All Events</button>
      </div>

      <h1 className="events-title">Campus Events</h1>

      <div className="events-grid">
        {filteredEvents.map((event) => (
          <div className="event-card" key={event._id} onClick={() => navigate(`/events/${event._id}`)}>
            <div className="event-card-inner">
              <img src={event.imageUrl} alt={event.title} className="event-image" />
              <div className="event-content">
                <h2 className="event-title">{event.title}</h2>
                <p className="event-date">{event.date} at {event.time}</p>
                <p className="event-location">📍 {event.location}</p>
                <p className="event-description">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
