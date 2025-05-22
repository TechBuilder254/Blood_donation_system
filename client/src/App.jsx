import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';

import Header from './components/Header';
import Home from './pages/Home';
import DonorProfile from './pages/DonorProfile';
import RequestBlood from './pages/RequestBlood';
import DonorRegister from './pages/DonorRegistration';
import Login from './components/Auth/Login';

// Admin imports
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import RegisteredDonors from './pages/admin/RegisteredDonors';
import BloodRequests from './pages/admin/BloodRequests';
import AdminProfile from './pages/admin/AdminProfile';
import AdminRoute from './components/AdminRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Private Routes */}
          <Route
            path="/donor-profile"
            element={
              <PrivateRoute>
                <DonorProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/request"
            element={
              <PrivateRoute>
                <RequestBlood />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PrivateRoute>
                <DonorRegister />
              </PrivateRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/registered"
            element={
              <AdminRoute>
                <RegisteredDonors />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/requests"
            element={
              <AdminRoute>
                <BloodRequests />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <AdminRoute>
                <AdminProfile />
              </AdminRoute>
            }
          />

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;