const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db'); // Ensure DB connection is loaded

// Middleware
app.use(cors());
app.use(express.json());

// Route imports
const donorRoutes = require('./routes/donorRoutes');
const requestRoutes = require('./routes/requestRoutes'); // Add request-related routes
const adminRoutes = require('./routes/adminRoutes');

// Mount routes
app.use('/api', donorRoutes);
app.use('/api', requestRoutes); // Make sure it's under the same /api prefix
app.use('/api/requests', require('./routes/requestRoutes'));
app.use('/api/admin', adminRoutes);


// Start server
app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
