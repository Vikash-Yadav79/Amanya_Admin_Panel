// src/components/ProtectedRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ roles, element: Component, ...rest }) => {
  const { role } = useAuth();

  if (!roles.includes(role)) {
    return <Navigate to="/" />; // Redirect to login if role is not allowed
  }

  return <Route {...rest} element={Component} />;
};

export default ProtectedRoute;
