const express = require('express');
const router = express.Router();
const db = require('../db'); // Ensure correct path to database connection

// Fetch donor profile
router.get('/donor-profile', async (req, res) => {
  try {
    const donorId = req.query.id; // Get donor ID dynamically

    if (!donorId) {
      return res.status(400).json({ error: 'Donor ID is required' });
    }

    const [rows] = await db.query('SELECT id, fullName, email, phone, age, bloodGroup, city, gender FROM donors WHERE id = ?', [donorId]);

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
  const { id, fullName, email, phone, age, bloodGroup, city, gender } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Donor ID is required' });
  }

  try {
    const [result] = await db.query(
      'UPDATE donors SET fullName = ?, email = ?, phone = ?, age = ?, bloodGroup = ?, city = ?, gender = ? WHERE id = ?',
      [fullName, email, phone, age, bloodGroup, city, gender, id]
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

// Delete donor profile
router.delete('/donor-profile', async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Donor ID is required' });
  }

  try {
    const [result] = await db.query('DELETE FROM donors WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'No donor found with the given ID' });
    }

    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting donor profile:', error);
    res.status(500).json({ error: 'Failed to delete profile' });
  }
});

module.exports = router;