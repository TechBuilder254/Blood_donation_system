// Load environment variables from the root .env file
require('dotenv').config({ path: __dirname + '/../.env' });

const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db'); // DB connection

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,
  })
);

app.use(express.json());

// Route imports
const donorRoutes = require('./routes/donorRoutes');
const donorProfileRoutes = require('./routes/donorProfileRoutes');
const requestRoutes = require('./routes/requestRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const adminLoginRoute = require('./routes/adminlogin');

// Mount routes
app.use('/api', donorRoutes);
app.use('/api/profile', donorProfileRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auth/admin-login', adminLoginRoute);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
