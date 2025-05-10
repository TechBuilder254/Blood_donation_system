import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/style.css'; // Adjust if you move styles

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-menu">
        <li className={location.pathname === '/admin/dashboard' ? 'active' : ''}>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li className={location.pathname === '/admin/registered' ? 'active' : ''}>
          <Link to="/admin/registered">Registered Donors</Link>
        </li>
        <li className={location.pathname === '/admin/requests' ? 'active' : ''}>
          <Link to="/admin/requests">Blood Requests</Link>
        </li>
        <li className={location.pathname === '/admin/profile' ? 'active' : ''}>
          <Link to="/admin/profile">Admin Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
