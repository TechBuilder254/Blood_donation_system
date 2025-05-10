import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import AdminProfile from './pages/admin/AdminProfile'; // ✅ Correct import
import RequestBlood from './pages/RequestBlood';
import DonorRegister from "./pages/DonorRegistration";
import './styles/style.css';
import 'font-awesome/css/font-awesome.min.css';
import { Navigate } from 'react-router-dom'; // ⬅ Add at the top with other imports

// ✅ Updated paths for admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import RegisteredDonors from './pages/admin/RegisteredDonors';
import PledgedDonors from './pages/admin/PledgedDonors';
import BloodRequests from './pages/admin/BloodRequests';
import DonorProfile from './pages/admin/AdminProfile';


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/request" element={<RequestBlood />} />
        <Route path="/register" element={<DonorRegister />} />
        <Route path="/profile" element={<DonorProfile />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/registered" element={<RegisteredDonors />} />
        <Route path="/admin/pledged" element={<PledgedDonors />} />
        <Route path="/admin/requests" element={<BloodRequests />} /> {/* ✅ Correct route */}
        <Route path="/admin/profile" element={<AdminProfile />} />
        
      </Routes>
    </Router>
  );
};

export default App;
