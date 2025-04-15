// src/pages/Events/CreateEvent.js
import React, { useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'events'), {
        title,
        location,
        date,
        description,
      });
      alert('Event created!');
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
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
