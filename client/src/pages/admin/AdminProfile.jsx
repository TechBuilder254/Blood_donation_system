// src/pages/admin/DonorProfile.jsx
import React from 'react';
import '../../styles/style.css'; // Adjust if you want to include global styles

const DonorProfile = () => {
  return (
    <div className="admin-container">
      <h2>Donor Profile</h2>
      <p>This is where you can view and manage individual donor details.</p>
      {/* Example fields */}
      <div className="profile-details">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Blood Group:</strong> B+</p>
        <p><strong>Location:</strong> Nairobi</p>
        <p><strong>Status:</strong> Approved</p>
      </div>
    </div>
  );
};

export default DonorProfile;
