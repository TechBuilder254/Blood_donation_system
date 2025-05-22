import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;