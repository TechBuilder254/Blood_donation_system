import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaUsers, FaTint, FaUserCog, FaSignOutAlt } from 'react-icons/fa';
import '../styles/style.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear admin authentication
    localStorage.removeItem('adminToken');
    // Redirect to home
    navigate('/');
  };

  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-menu">
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <FaHome /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/registered"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <FaUsers /> Registered Donors
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/requests"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <FaTint /> Blood Requests
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/profile"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <FaUserCog /> Admin Profile
          </NavLink>
        </li>
        <li className="logout-item">
          <button onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;