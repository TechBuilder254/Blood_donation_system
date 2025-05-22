const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db');

// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required',
    });
  }

  try {
    db.query('SELECT * FROM admin WHERE username = ? LIMIT 1', [username], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ success: false, message: 'Database error' });
      }

      const admin = results[0];

      if (!admin || !admin.password) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      const isValid = await bcrypt.compare(password, admin.password);

      if (!isValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      // Remove password from response
      const { password: _, ...adminData } = admin;

      res.json({
        success: true,
        message: 'Login successful',
        admin: adminData,
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
    });
  }
});

// Get all admins (for frontend admin list)
router.get('/all', (req, res) => {
  db.query('SELECT id, username FROM admin ORDER BY id DESC', (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json({ admins: results });
  });
});

// Get all registered donors
router.get('/donors', async (req, res) => {
  try {
    const query = `
      SELECT id, fullName, bloodGroup, phone, email, Age, city, gender, status 
      FROM donors 
      ORDER BY id DESC
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching donors:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to fetch donors'
        });
      }
      res.json({
        success: true,
        donors: results
      });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching donors'
    });
  }
});

// Update donor status
router.put('/donors/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const query = 'UPDATE donors SET status = ? WHERE id = ?';
    db.query(query, [status, id], (err, result) => {
      if (err) {
        console.error('Error updating donor status:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to update donor status'
        });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Donor not found'
        });
      }
      res.json({
        success: true,
        message: 'Donor status updated successfully'
      });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating donor status'
    });
  }
});

// Add new admin
router.post('/add', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required'
    });
  }

  try {
    db.query('SELECT id FROM admin WHERE username = ?', [username], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Database error'
        });
      }

      if (results.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Username already exists'
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const query = 'INSERT INTO admin (username, password) VALUES (?, ?)';
      db.query(query, [username, hashedPassword], (err, result) => {
        if (err) {
          console.error('Insert error:', err);
          return res.status(500).json({
            success: false,
            message: 'Failed to create admin'
          });
        }

        res.status(201).json({
          success: true,
          message: 'Admin created successfully',
          adminId: result.insertId
        });
      });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating admin'
    });
  }
});

// Update admin username
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ success: false, message: 'Username is required' });
  }

  db.query('UPDATE admin SET username = ? WHERE id = ?', [username, id], (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ success: false, message: 'Failed to update admin' });
    }
    res.json({ success: true, message: 'Admin updated successfully' });
  });
});

// Delete admin
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM admin WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ success: false, message: 'Failed to delete admin' });
    }
    res.json({ success: true, message: 'Admin deleted successfully' });
  });
});

module.exports = router;