import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide header in admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={{ 
      padding: '15px 20px', 
      backgroundColor: '#d32f2f', 
      color: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Logo Name */}
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
            BLOOD DONATION SYSTEM
          </Link>
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>
                Become a Donor
              </Link>
              <Link to="/request" style={{ color: '#fff', textDecoration: 'none' }}>
                Need Blood
              </Link>
              <Link to="/donor-profile" style={{ color: '#fff', textDecoration: 'none' }}>
                Contact Us
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: '#b71c1c',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#fff',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  transition: 'background-color 0.2s'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                style={{ 
                  color: '#fff', 
                  textDecoration: 'none',
                  backgroundColor: '#b71c1c',
                  padding: '8px 16px',
                  borderRadius: '4px'
                }}
              >
                Login
              </Link>
              <Link 
                to="/admin-login" 
                style={{ 
                  color: '#fff', 
                  textDecoration: 'none',
                  backgroundColor: '#b71c1c',
                  padding: '8px 16px',
                  borderRadius: '4px'
                }}
              >
                Admin Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;