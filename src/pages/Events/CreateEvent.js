// src/pages/Events/CreateEvent.js
import React, { useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { QRCode } from 'qrcode.react';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [tickets, setTickets] = useState(0);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      // Add event data to Firestore
      const eventRef = await addDoc(collection(db, 'events'), {
        title,
        location,
        date,
        description,
        ticketsGenerated: tickets,
      });

      // Generate tickets and store in Firestore
      for (let i = 0; i < tickets; i++) {
        const ticketId = uuidv4();
        await addDoc(collection(db, 'events', eventRef.id, 'tickets'), {
          ticketId,
          eventId: eventRef.id,
          qrCode: `https://api.qrserver.com/v1/create-qr-code/?data=${ticketId}&size=150x150`,
        });
      }

      alert('Event created and tickets generated!');
    } catch (error) {
      alert('Error creating event: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleCreateEvent}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event Title" required />
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Event Location" required />
        <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Event Description" required />
        <input type="number" value={tickets} onChange={(e) => setTickets(Number(e.target.value))} placeholder="Number of Tickets" required />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
