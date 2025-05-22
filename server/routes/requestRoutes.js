const express = require('express');
const router = express.Router();
const db = require('../db');

// Submit a blood request and return matching donors
router.post('/request-blood', (req, res) => {
  const { fullname, mobile, bloodgroup, reason } = req.body;

  db.query(
    'INSERT INTO blood_requests (fullname, mobile, bloodgroup, reason) VALUES (?, ?, ?, ?)',
    [fullname, mobile, bloodgroup, reason],
    (err, result) => {
      if (err) {
        console.error('Error inserting request:', err.message);
        return res.status(500).json({ success: false, message: 'Server error' });
      }

      // Fetch matching donors with their actual status
      db.query(
        `SELECT 
           id, 
           fullName, 
           bloodGroup, 
           city, 
           phone, 
           status 
         FROM donors 
         WHERE bloodGroup = ?`,
        [bloodgroup],
        (err, donors) => {
          if (err) {
            console.error('Error fetching donors:', err.message);
            return res.status(500).json({ success: false, message: 'Failed to fetch donors' });
          }

          res.json({ success: true, donors });
        }
      );
    }
  );
});

// Get all donors (with actual status)
router.get('/requested-donors', (req, res) => {
  db.query(
    `SELECT 
       id, 
       fullName, 
       bloodGroup, 
       city, 
       phone, 
       status 
     FROM donors`,
    (err, donors) => {
      if (err) {
        console.error('Error in /requested-donors:', err.message);
        return res.status(500).json({ success: false, message: 'Failed to fetch donors' });
      }

      res.json({ success: true, donors });
    }
  );
});

// Update a donor's request status (e.g. 'pending', 'approved', null)
router.post('/update-request-status', (req, res) => {
  const { donor_id, status } = req.body;

  db.query(
    'UPDATE donors SET status = ? WHERE id = ?',
    [status, donor_id],
    (err, result) => {
      if (err) {
        console.error('Error updating status:', err.message);
        return res.status(500).json({ success: false, message: 'Failed to update status' });
      }

      res.json({ success: true, status });
    }
  );
});

// Delete a blood request by ID
router.delete('/delete-request/:id', (req, res) => {
  const requestId = req.params.id;

  db.query('DELETE FROM blood_requests WHERE id = ?', [requestId], (err, result) => {
    if (err) {
      console.error('Error deleting request:', err.message);
      return res.status(500).json({ success: false, message: 'Failed to delete request' });
    }

    res.json({ success: true, message: 'Request deleted successfully' });
  });
});


// Get daily blood requests
router.get('/daily-requests', (req, res) => {
  const sql = `
    SELECT DATE(requested_at) as date, COUNT(*) as count
    FROM blood_requests
    GROUP BY DATE(requested_at)
    ORDER BY date ASC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json([]);
    res.json(results);
  });
});

// Get blood group stats for requests
router.get('/blood-type-stats', (req, res) => {
  const sql = `
    SELECT bloodgroup as bloodType, COUNT(*) as requests
    FROM blood_requests
    GROUP BY bloodgroup
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json([]);
    res.json(results);
  });
});
module.exports = router;
