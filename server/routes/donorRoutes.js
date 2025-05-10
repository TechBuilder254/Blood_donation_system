const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust path as needed

router.post('/register-donor', async (req, res) => {
  const { fullName, bloodGroup, phone, email, Age, city, gender } = req.body;

  try {
    await db.query(
      'INSERT INTO donors (fullName, bloodGroup, phone, email, Age, city, gender) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [fullName, bloodGroup, phone, email, Age, city, gender]
    );
    res.status(200).json({ message: 'Donor registered successfully' });
  } catch (error) {
    console.error('Error inserting donor:', error);
    res.status(500).json({ error: 'Failed to register donor' });
  }
});

// GET all registered donors
router.get('/register-donor', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM donors');
    res.status(200).json({ donors: rows });
  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).json({ error: 'Failed to fetch donors' });
  }
});


module.exports = router;
