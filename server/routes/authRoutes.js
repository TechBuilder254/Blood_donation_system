const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const db = require('../db'); // Database connection
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the username or email already exists
    const checkQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.query(checkQuery, [username, email], async (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      if (results.length > 0) {
        return res.status(400).json({ message: 'Username or email already exists' });
      }

      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(insertQuery, [username, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ message: 'Registration failed', error: err });
        res.json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during registration', error: error.message });
  }
});

// Login Route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Both username and password are required' });
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = results[0];

    try {
      // Compare the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'An error occurred during login', error: error.message });
    }
  });
});

// Forgot Password Route
router.post('/forgot-password', (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email and new password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Email not found' });

    try {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updateQuery = 'UPDATE users SET password = ? WHERE email = ?';
      db.query(updateQuery, [hashedPassword, email], (err, result) => {
        if (err) return res.status(500).json({ message: 'Password reset failed', error: err });
        res.json({ message: 'Password reset successful' });
      });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred during password reset', error: error.message });
    }
  });
});

module.exports = router;