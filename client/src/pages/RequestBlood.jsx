import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/style.css';

const RequestBlood = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    mobile: '',
    bloodgroup: '',
    reason: '',
  });

  const [message, setMessage] = useState('');
  const [donors, setDonors] = useState([]);
  const [requestStatus, setRequestStatus] = useState({});
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/requests/requested-donors')
      .then((res) => {
        const donorList = res.data.donors || [];
        setDonors(donorList);
        const statusMap = {};
        donorList.forEach((d) => {
          statusMap[d.id] = d.status || null;
        });
        setRequestStatus(statusMap);
      })
      .catch(() => {
        setMessage('Failed to load request history');
      });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    axios
      .post('http://localhost:3000/api/requests/request-blood', formData)
      .then((res) => {
        setMessage('Request submitted successfully.');
        const newDonors = res.data.donors || [];
        setDonors(newDonors);
        const newStatusMap = {};
        newDonors.forEach((d) => {
          newStatusMap[d.id] = requestStatus[d.id] || null;
        });
        setRequestStatus(newStatusMap);
        setFormData({ fullname: '', mobile: '', bloodgroup: '', reason: '' });
      })
      .catch(() => {
        setMessage('Something went wrong. Please try again.');
      });
  };

  const toggleRequest = (donorId, newStatus) => {
    axios
      .post('http://localhost:3000/api/requests/update-request-status', {
        donor_id: donorId,
        status: newStatus,
      })
      .then(() => {
        setRequestStatus((prev) => ({ ...prev, [donorId]: newStatus }));
      })
      .catch(() => {
        alert('Failed to update status.');
      });
  };

  return (
    <div className="request-blood-page">
      <h2>Request Blood</h2>

      <form onSubmit={handleSubmit} className="request-form">
        <div className="form-group">
          <label>Full Name*</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Mobile Number*</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Blood Group*</label>
          <select
            name="bloodgroup"
            value={formData.bloodgroup}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Reason for Request*</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit" className="btn">
          Submit Request
        </button>
      </form>

      {message && <div className={`message ${message.includes('fail') || message.includes('wrong') ? 'error' : ''}`}>{message}</div>}

      <h3>Matching Donors</h3>
      <div className="donor-cards">
        {donors.map((donor) => (
          <div className="donor-card" key={donor.id}>
            <img src="/assets/images/hpndzj75.png" alt="Donor" className="card-image" />
            <h4>{donor.fullName}</h4>
            <p>Blood Group: {donor.bloodGroup}</p>
            <p>City: {donor.city}</p>
            <p>Phone: {donor.phone}</p>
            <p>Status: <span className={`status ${requestStatus[donor.id]}`}>{requestStatus[donor.id] || 'None'}</span></p>

            {requestStatus[donor.id] === 'pending' ? (
              <button className="btn cancel" onClick={() => toggleRequest(donor.id, null)}>
                Cancel Request
              </button>
            ) : (
              <button className="btn request" onClick={() => toggleRequest(donor.id, 'pending')}>
                Request
              </button>
            )}
          </div>
        ))}
      </div>

      <button className="toggle-history-btn" onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? 'Hide' : 'Show'} Request History
      </button>

      {showHistory && (
        <div className="history-section">
          <h4>Your Request History</h4>
          {donors
            .filter((d) => requestStatus[d.id])
            .map((d) => (
              <div key={d.id} className="history-card">
                <p>{d.fullName} - {d.bloodGroup} ({requestStatus[d.id]})</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default RequestBlood;
