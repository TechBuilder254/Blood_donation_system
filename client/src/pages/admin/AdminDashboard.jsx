import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import './styles.css';

const COLORS = ['#d32f2f', '#1976d2', '#388e3c', '#fbc02d', '#7b1fa2', '#0288d1', '#c2185b', '#ffa000'];

const AdminDashboard = () => {
  const [dailyRequests, setDailyRequests] = useState([]);
  const [bloodTypeStats, setBloodTypeStats] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch daily blood requests
    axios.get(`${API_URL}/api/requests/daily-requests`)
      .then(res => setDailyRequests(res.data))
      .catch(() => setDailyRequests([]));

    // Fetch blood type stats for requests
    axios.get(`${API_URL}/api/requests/blood-type-stats`)
      .then(res => setBloodTypeStats(res.data))
      .catch(() => setBloodTypeStats([]));
  }, [API_URL]);

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-content">
        <h2>Admin Dashboard</h2>
        <p>Welcome to the Admin Dashboard</p>

        <div style={{ width: '100%', maxWidth: 700, margin: '30px auto' }}>
          <h3>Daily Blood Requests</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyRequests}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#d32f2f" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginTop: 40 }}>
          <div>
            <h3>Requests by Blood Group</h3>
            <ResponsiveContainer width={300} height={300}>
              <PieChart>
                <Pie
                  data={bloodTypeStats}
                  dataKey="requests"
                  nameKey="bloodType"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#1976d2"
                  label
                >
                  {bloodTypeStats.map((entry, index) => (
                    <Cell key={`cell-request-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;