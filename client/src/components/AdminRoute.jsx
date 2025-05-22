import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAdminLoggedIn } = useAuth();
  const adminToken = localStorage.getItem('adminToken');

  // Check if admin is logged in and has valid token
  if (isAdminLoggedIn && adminToken) {
    return children;
  }

  // Redirect to admin login if not authenticated
  return <Navigate to="/admin/login" replace />;
};

export default AdminRoute;