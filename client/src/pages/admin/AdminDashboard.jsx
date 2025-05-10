// client/src/pages/admin/AdminDashboard.jsx
import React from 'react';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';
import './styles.css'; // Importing the CSS for the Admin Dashboard

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-content">
        <h2>Admin Dashboard</h2>
        <p>Welcome to the Admin Dashboard</p>
        
      </div>
    </div>
  );
};

export default AdminDashboard;
