const db = require('../db');  // Ensure this is your MySQL connection

// Controller function for donating blood
exports.donateBlood = (req, res) => {
  const { name, mobile, location, bloodgroup } = req.body;

  if (!name || !mobile || !location || !bloodgroup) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Insert data into the database
  const sql = 'INSERT INTO donors (name, mobile, location, bloodgroup) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, mobile, location, bloodgroup], (err, result) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    return res.json({ message: 'Donation recorded successfully' });
  });
};
