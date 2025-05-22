import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import './styles.css';

const AdminProfile = () => {
  const [admins, setAdmins] = useState([]);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editId, setEditId] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [message, setMessage] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch all admins
  const fetchAdmins = () => {
    axios.get(`${API_URL}/api/admin/all`)
      .then(res => setAdmins(res.data.admins || res.data)) // support both {admins:[]} and []
      .catch(() => setAdmins([]));
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Add new admin
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (!newUsername || !newPassword) {
      setMessage('Username and password required');
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/api/admin/add`, {
        username: newUsername,
        password: newPassword,
      });
      setMessage(res.data.message || 'Admin added!');
      setNewUsername('');
      setNewPassword('');
      fetchAdmins();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add admin');
    }
  };

  // Start editing
  const startEdit = (admin) => {
    setEditId(admin.id);
    setEditUsername(admin.username);
  };

  // Save edit
  const handleEditAdmin = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/api/admin/update/${id}`, {
        username: editUsername,
      });
      setMessage(res.data.message || 'Admin updated!');
      setEditId(null);
      fetchAdmins();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update admin');
    }
  };

  // Delete admin
  const handleDeleteAdmin = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;
    try {
      const res = await axios.delete(`${API_URL}/api/admin/delete/${id}`);
      setMessage(res.data.message || 'Admin deleted!');
      fetchAdmins();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to delete admin');
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-content">
        <div style={{ maxWidth: 800, margin: '20px auto', background: '#fff', padding: 24, borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#d32f2f', marginBottom: '20px' }}>Admin Management</h2>
          <form onSubmit={handleAddAdmin} style={{ marginBottom: 24 }}>
            <h4>Add New Admin</h4>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Username"
                value={newUsername}
                onChange={e => setNewUsername(e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  flex: 1
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  flex: 1
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#d32f2f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Add Admin
              </button>
            </div>
          </form>

          <h4>All Admins</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: 12, border: '1px solid #ddd' }}>ID</th>
                <th style={{ padding: 12, border: '1px solid #ddd' }}>Username</th>
                <th style={{ padding: 12, border: '1px solid #ddd' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map(admin => (
                <tr key={admin.id}>
                  <td style={{ padding: 12, border: '1px solid #ddd' }}>{admin.id}</td>
                  <td style={{ padding: 12, border: '1px solid #ddd' }}>
                    {editId === admin.id ? (
                      <input
                        value={editUsername}
                        onChange={e => setEditUsername(e.target.value)}
                        style={{
                          padding: '8px',
                          width: '100%',
                          borderRadius: '4px',
                          border: '1px solid #ddd'
                        }}
                      />
                    ) : (
                      admin.username
                    )}
                  </td>
                  <td style={{ padding: 12, border: '1px solid #ddd' }}>
                    {editId === admin.id ? (
                      <>
                        <button
                          onClick={() => handleEditAdmin(admin.id)}
                          style={{
                            marginRight: 8,
                            padding: '6px 12px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#666',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(admin)}
                          style={{
                            marginRight: 8,
                            padding: '6px 12px',
                            backgroundColor: '#2196F3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAdmin(admin.id)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {message && (
            <p style={{
              color: message.includes('fail') ? '#f44336' : '#4CAF50',
              marginTop: 16,
              textAlign: 'center',
              padding: '10px',
              borderRadius: '4px',
              backgroundColor: message.includes('fail') ? '#ffebee' : '#e8f5e9'
            }}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;