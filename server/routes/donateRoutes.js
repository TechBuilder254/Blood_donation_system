const express = require('express');
const router = express.Router();
const { donateBlood } = require('../controllers/donorController');  // Ensure correct import

// POST route for donating blood
router.post('/donate-blood', donateBlood);

module.exports = router;
