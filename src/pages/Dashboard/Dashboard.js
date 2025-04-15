// src/pages/Dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../../firebase/eventService';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error.message);
      }
    };

    getEvents();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => navigate('/events/create')}>Create New Event</button>
      
      <h3>Upcoming Events</h3>
      <div className="event-list">
        {events.length === 0 ? (
          <p>No events found</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <h4>{event.title}</h4>
              <p>{event.location}</p>
              <p>{new Date(event.date.seconds * 1000).toLocaleString()}</p>
              <button onClick={() => navigate(`/events/${event.id}`)}>View Event</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;

