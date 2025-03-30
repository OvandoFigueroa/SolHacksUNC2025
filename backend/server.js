
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const port = 5001;

const app = express();

// Setup middleware to handle JSON requests
// Enable CORS
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

app.get('/test', (req, res) => {
    res.send('Server is working!');
  });

// Initialize SQLite database
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to the SQLite database.');
    }
  });
  
  // Create the users table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )`,
    (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Users table created or already exists.');
      }
    }
  );

// Register Route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into database
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Failed to register user', error: err.message });
    }
    res.status(201).json({ message: 'Registration successful', userId: this.lastID });
  });
});

// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check if user exists
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', userId: user.id });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});