import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const styles = `
.admin-login-container {
  max-width: 400px;
  margin: 60px auto;
  padding: 32px 28px 24px 28px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(211,47,47,0.18), 0 1.5px 6px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.admin-login-container h2 {
  color: #d32f2f;
  margin-bottom: 24px;
  font-weight: 700;
  letter-spacing: 1px;
}
.admin-login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.admin-login-form label {
  font-weight: 500;
  margin-bottom: 6px;
  color: #333;
  margin-top: 10px;
}
.admin-login-form input {
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  margin-bottom: 14px;
  font-size: 16px;
  transition: border 0.2s;
}
.admin-login-form input:focus {
  border: 1.5px solid #d32f2f;
  outline: none;
}
.admin-login-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(90deg, #d32f2f 60%, #b71c1c 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 17px;
  letter-spacing: 1px;
  cursor: pointer;
  margin-top: 8px;
  box-shadow: 0 2px 8px rgba(211,47,47,0.08);
  transition: background 0.2s;
}
.admin-login-btn:hover {
  background: linear-gradient(90deg, #b71c1c 60%, #d32f2f 100%);
}
.admin-login-message {
  color: #d32f2f;
  margin-top: 14px;
  font-weight: 500;
  text-align: center;
  min-height: 24px;
}
@media (max-width: 500px) {
  .admin-login-container {
    padding: 18px 6px 16px 6px;
  }
  .admin-login-form input, .admin-login-btn {
    font-size: 15px;
    padding: 10px;
  }
}
`;

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { adminLogin } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleAdminLogin = async (e) => {
  e.preventDefault();
  console.log('Login attempt started'); // Debug log

  try {
    setMessage('');
    
    if (!username || !password) {
      setMessage('Please enter both username and password.');
      return;
    }

    const response = await axios.post(`${API_URL}/api/admin/login`, {
      username,
      password
    });

    console.log('Login response:', response.data); // Debug log

    // Store the token
    localStorage.setItem('adminToken', response.data.token || 'true');
    
    // Update auth context
    adminLogin();
    
    console.log('About to navigate to dashboard'); // Debug log
    
    // Force navigation with replace to clear history
    navigate('/admin/dashboard', { replace: true });
    
  } catch (error) {
    console.error('Login error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    setMessage(
      error.response?.data?.message || 
      'Invalid credentials. Please try again.'
    );
  }
};
  return (
    <>
      <style>{styles}</style>
      <div className="admin-login-container">
        <h2>Admin Login</h2>
        <form className="admin-login-form" onSubmit={handleAdminLogin}>
          <label htmlFor="admin-username">Username</label>
          <input
            id="admin-username"
            type="text"
            value={username}
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter admin username"
          />
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button className="admin-login-btn" type="submit">
            Login
          </button>
          <div className="admin-login-message">{message}</div>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;