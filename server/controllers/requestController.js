const db = require('../db');

// 1. Handle blood request and return matching donors
exports.requestBlood = (req, res) => {
  const { fullname, mobile, bloodgroup, reason } = req.body;

  db.query(
    'INSERT INTO blood_requests (fullname, mobile, bloodgroup, reason) VALUES (?, ?, ?, ?)',
    [fullname, mobile, bloodgroup, reason],
    (err, result) => {
      if (err) {
        console.error('Error inserting request:', err.message);
        return res.status(500).json({ success: false, message: 'Server error' });
      }

      db.query(
        'SELECT id, name, bloodgroup, location, mobile, status FROM donors WHERE bloodgroup = ?',
        [bloodgroup],
        (err, donors) => {
          if (err) {
            console.error('Error fetching donors:', err.message);
            return res.status(500).json({ success: false, message: 'Server error' });
          }

          res.json({ success: true, donors });
        }
      );
    }
  );
};

// 2. Get all donors (used for donor history)
exports.getRequestedDonors = (req, res) => {
  db.query(
    'SELECT id, name, bloodgroup, location, mobile, status FROM donors',
    (err, donors) => {
      if (err) {
        console.error('Error fetching donors:', err.message);
        return res.status(500).json({ success: false, message: 'Failed to fetch donors' });
      }

      res.json({ success: true, donors });
    }
  );
};

// 3. Update donor request status
exports.updateRequestStatus = (req, res) => {
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
};

// 4. Delete blood request
exports.deleteRequest = (req, res) => {
  const requestId = req.params.id;

  db.query('DELETE FROM blood_requests WHERE id = ?', [requestId], (err, result) => {
    if (err) {
      console.error('Error deleting request:', err.message);
      return res.status(500).json({ success: false, message: 'Failed to delete request' });
    }

    res.json({ success: true, message: 'Request deleted successfully' });
  });
};

// 5. Get blood request history
exports.getRequestHistory = (req, res) => {
  db.query('SELECT * FROM blood_requests ORDER BY id DESC', (err, results) => {
    if (err) {
      console.error('Error fetching request history:', err.message);
      return res.status(500).json({ success: false, message: 'Failed to fetch request history' });
    }

    res.json({ success: true, requests: results });
  });
};
