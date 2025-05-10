// server/models/donorModel.js

const db = require('../db');

// Get all donors
const getAllDonors = (callback) => {
  db.query('SELECT * FROM donors', callback);
};

// Get donor by ID
const getDonorById = (id, callback) => {
  db.query('SELECT * FROM donors WHERE id = ?', [id], callback);
};

// Add new donor
const addDonor = (donor, callback) => {
  const { name, blood_group, email, phone } = donor;
  db.query(
    'INSERT INTO donors (name, blood_group, email, phone) VALUES (?, ?, ?, ?)',
    [name, blood_group, email, phone],
    callback
  );
};

// Update donor
const updateDonor = (id, donor, callback) => {
  const { name, blood_group, email, phone } = donor;
  db.query(
    'UPDATE donors SET name = ?, blood_group = ?, email = ?, phone = ? WHERE id = ?',
    [name, blood_group, email, phone, id],
    callback
  );
};

// Delete donor
const deleteDonor = (id, callback) => {
  db.query('DELETE FROM donors WHERE id = ?', [id], callback);
};

module.exports = {
  getAllDonors,
  getDonorById,
  addDonor,
  updateDonor,
  deleteDonor,
};
