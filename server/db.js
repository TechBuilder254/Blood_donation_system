const mysql = require('mysql');
const dotenv = require('dotenv');
const util = require('util');

// Load environment variables
dotenv.config();

console.log('Database Configuration:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
 
});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL database');
});

// ✅ Add this line to use async/await with db.query
db.query = util.promisify(db.query);

module.exports = db;
