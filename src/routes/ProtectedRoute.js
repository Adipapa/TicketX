// src/routes/ProtectedRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../firebase/firebase';

const ProtectedRoute = ({ element, ...rest }) => {
  const user = auth.currentUser;

  return (
    <Route
      {...rest}
      element={user ? element : <Redirect to="/" />}
    />
  );
};

export default ProtectedRoute;
