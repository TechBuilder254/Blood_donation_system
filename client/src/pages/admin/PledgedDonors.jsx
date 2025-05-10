// client/src/pages/admin/PledgedDonors.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import './styles.css';


const PledgedDonors = () => {
  const [pledgedDonors, setPledgedDonors] = useState([]);

  useEffect(() => {
    // Fetch pledged donors from the backend
    fetch('/api/pledged-donors')
      .then((response) => response.json())
      .then((data) => setPledgedDonors(data.donors))
      .catch((error) => console.error('Error fetching pledged donors:', error));
  }, []);

  return (
    <div className="admin-page">
      <Sidebar />
      <div className="admin-content">
        <h2>Pledged Donors</h2>
        <ul>
          {pledgedDonors.map((donor) => (
            <li key={donor.id}>
              <div>
                <h4>{donor.name}</h4>
                <p>{donor.bloodgroup}</p>
                <p>{donor.location}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PledgedDonors;
