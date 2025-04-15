// src/firebase/eventService.js
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

export const fetchEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'events'));
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push({ ...doc.data(), id: doc.id });
    });
    return events;
  } catch (error) {
    throw new Error(error.message);
  }
};
