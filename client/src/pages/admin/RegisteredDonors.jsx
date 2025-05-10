import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import './styles.css';

const RegisteredDonors = () => {
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/admin/donors')
      .then((res) => {
        setDonors(res.data.donors || []);
      })
      .catch(() => {
        setError('Failed to load registered donors');
      });
  }, []);

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-content">
        <h2>Registered Donors</h2>
        {error && <p className="message error">{error}</p>}
        <div className="donor-cards">
          {donors.length === 0 ? (
            <p>No registered donors found.</p>
          ) : (
            donors.map((donor) => (
              <div className="donor-card" key={donor.id}>
                <img
                  src="/assets/images/hpndzj75.png"
                  alt="Donor"
                  className="card-image"
                />
                <h4>{donor.fullName}</h4>
                <p>Blood Group: {donor.bloodGroup}</p>
                <p>Age: {donor.Age}</p>
                <p>Phone: {donor.phone}</p>
                <p>Email: {donor.email}</p>
                <p>City: {donor.city}</p>
                <p>Gender: {donor.gender}</p>
                <p>Status: {donor.status || 'none'}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisteredDonors;
