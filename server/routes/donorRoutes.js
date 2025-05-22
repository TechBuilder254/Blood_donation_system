const express = require('express');
const router = express.Router();
const db = require('../db'); // Ensure correct path to database connection

// Register a new donor
router.post('/register-donor', async (req, res) => {
  const { fullName, bloodGroup, phone, email, Age, city, gender } = req.body;

  if (!fullName || !bloodGroup || !phone || !email || !Age || !city || !gender) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Corrected destructuring to avoid "intermediate value is not iterable" error
    const result = await db.query(
      'INSERT INTO donors (fullName, bloodGroup, phone, email, Age, city, gender) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [fullName, bloodGroup, phone, email, Age, city, gender]
    );

    res.status(201).json({ message: 'Donor registered successfully', donorId: result.insertId });
  } catch (error) {
    console.error('Error inserting donor:', error);

    // Handle specific database errors
    if (error.code === 'ER_NO_SUCH_TABLE') {
      res.status(500).json({ error: 'Database table "donors" does not exist' });
    } else if (error.code === 'ER_BAD_FIELD_ERROR') {
      res.status(500).json({ error: 'Invalid column name in the database query' });
    } else {
      res.status(500).json({ error: 'Failed to register donor' });
    }
  }
});

// Fetch donor profile
router.get('/donor-profile', async (req, res) => {
  try {
    const donorId = req.query.id; // Get donor ID dynamically

    if (!donorId) {
      return res.status(400).json({ error: 'Donor ID is required' });
    }

    const [rows] = await db.query('SELECT id, fullName, email, phone, age FROM donors WHERE id = ?', [donorId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching donor profile:', error);
    res.status(500).json({ error: 'Failed to fetch donor profile' });
  }
});

// Update donor profile
router.put('/donor-profile', async (req, res) => {
  const { id, fullName, email, phone, age } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Donor ID is required' });
  }

  try {
    const [result] = await db.query(
      'UPDATE donors SET fullName = ?, email = ?, phone = ?, age = ? WHERE id = ?',
      [fullName, email, phone, age, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'No donor found with the given ID' });
    }

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating donor profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;