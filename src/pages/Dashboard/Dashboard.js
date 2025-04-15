// src/pages/Dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../../firebase/eventService';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        for (let event of fetchedEvents) {
          // Fetch tickets for each event
          const ticketsSnapshot = await getDocs(collection(db, 'events', event.id, 'tickets'));
          const tickets = [];
          ticketsSnapshot.forEach((doc) => {
            tickets.push(doc.data());
          });
          event.tickets = tickets; // Add tickets to event
        }
        setEvents(fetchedEvents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error.message);
        setLoading(false);
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
        {loading ? (
          <p>Loading...</p>
        ) : events.length === 0 ? (
          <p>No events found</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <h4>{event.title}</h4>
              <p>{event.location}</p>
              <p>{new Date(event.date.seconds * 1000).toLocaleString()}</p>
              <button onClick={() => navigate(`/events/${event.id}`)}>View Event</button>

              <div className="ticket-list">
                <h5>Tickets:</h5>
                {event.tickets.map((ticket) => (
                  <div key={ticket.ticketId} className="ticket-card">
                    <h6>Ticket ID: {ticket.ticketId}</h6>
                    <img src={ticket.qrCode} alt="Ticket QR Code" />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
