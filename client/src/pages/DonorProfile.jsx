// client/src/pages/DonorProfile.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DonorProfile = () => {
  return (
    <div>
      <Navbar />
      <div className="donor-profile-container">
        <h2>Your Donor Profile</h2>
        <p>Details about your donations and blood group.</p>
        {/* Add donor information */}
      </div>
      <Footer />
    </div>
  );
};

export default DonorProfile;
