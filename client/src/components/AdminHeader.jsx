import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const AdminHeader = () => {
  return (
    <div style={{
      padding: '1rem 2rem',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      right: 0,
      left: '250px', // Width of sidebar
      zIndex: 100
    }}>
      <h2>Welcome, Admin</h2>
      <Link to="/admin/profile">
        <FaUserCircle size={24} color="#d32f2f" />
      </Link>
    </div>
  );
};

export default AdminHeader;