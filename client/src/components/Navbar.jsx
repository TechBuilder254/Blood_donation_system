import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff' }}>
      <Link to="/" style={{ marginRight: '15px', color: '#fff', textDecoration: 'none' }}>
        Home
      </Link>
      {isAuthenticated ? (
        <>
          <Link to="/become-donor" style={{ marginRight: '15px', color: '#fff', textDecoration: 'none' }}>
            Become a Donor
          </Link>
          <Link to="/need-blood" style={{ marginRight: '15px', color: '#fff', textDecoration: 'none' }}>
            Need Blood
          </Link>
          <button
            onClick={onLogout}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;