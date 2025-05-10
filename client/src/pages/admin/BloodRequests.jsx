import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import './styles.css'; // Ensure this file is styled


const BloodRequests = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    axios
      .get('http://localhost:3000/api/requests/requested-donors')
      .then((res) => {
        setRequests(res.data.donors || []);
      })
      .catch(() => {
        setMessage('Failed to load donor requests');
      });
  };

  const updateStatus = (donorId, newStatus) => {
    axios
      .post('http://localhost:3000/api/requests/update-request-status', {
        donor_id: donorId,
        status: newStatus,
      })
      .then(() => {
        setRequests((prev) =>
          prev.map((donor) =>
            donor.id === donorId ? { ...donor, status: newStatus } : donor
          )
        );
      })
      .catch(() => {
        setMessage('Failed to update status');
      });
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-content">
        <h2>Blood Requests</h2>
        {message && <p className="message error">{message}</p>}
        <div className="donor-cards">
          {requests.length === 0 ? (
            <p>No requests found.</p>
          ) : (
            requests.map((donor) => (
              <div className="donor-card" key={donor.id}>
              <img
                src="/assets/images/hpndzj75.png"
                alt="Donor"
                className="card-image"
              />
                <h4>{donor.fullName}</h4>
                <p>Blood Group: {donor.bloodGroup}</p>
                <p>Location: {donor.city}</p>
                <p>Mobile: {donor.phone}</p>
                <p>
                  Status:{' '}
                  <span
                    style={{
                      color:
                        donor.status === 'approved'
                          ? 'green'
                          : donor.status === 'denied'
                          ? 'red'
                          : donor.status === 'pending'
                          ? 'orange'
                          : 'black',
                    }}
                  >
                    {donor.status || 'none'}
                  </span>
                </p>
                <div className="admin-actions">
                  <button
                    className="btn approve"
                    disabled={donor.status === 'approved'}
                    onClick={() => updateStatus(donor.id, 'approved')}
                  >
                    Approve
                  </button>
                  <button
                    className="btn deny"
                    disabled={donor.status === 'denied'}
                    onClick={() => updateStatus(donor.id, 'denied')}
                  >
                    Deny
                  </button>
                  <button
                    className="btn cancel"
                    onClick={() => updateStatus(donor.id, 'none')}
                  >
                    Cancel Request
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BloodRequests;
