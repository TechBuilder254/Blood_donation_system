// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust path if needed

// GET all registered donors
router.get('/donors', (req, res) => {
    db.query('SELECT * FROM donors', (err, results) => {
      if (err) {
        console.error('Error fetching donors:', err.message);
        return res.status(500).json({ success: false, message: 'Failed to fetch donors' });
      }
  
      // Return the donor array directly in the same format as BloodRequests
      res.json({ success: true, donors: results });
    });
  });
  

module.exports = router;
