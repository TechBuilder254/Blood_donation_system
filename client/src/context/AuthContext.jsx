import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check authentication status on mount
    const auth = localStorage.getItem('auth');
    const adminToken = localStorage.getItem('adminToken');
    let storedUser = localStorage.getItem('user');

    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem('user'); // Remove invalid data
        storedUser = null; // Ensure storedUser is null for the next check
        setUser(null); // Set user to null to avoid further errors
      }
    } else {
      storedUser = null; // Ensure storedUser is null if it's "undefined"
    }

    setIsAuthenticated(auth === 'true');
    setIsAdminLoggedIn(adminToken === 'true');
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('auth', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const adminLogin = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('adminToken', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdminLoggedIn(false);
    setUser(null);
    localStorage.removeItem('auth');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isAdminLoggedIn,
      user,
      login,
      adminLogin,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};