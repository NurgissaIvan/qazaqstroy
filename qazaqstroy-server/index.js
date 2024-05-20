const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

// Настройка пула соединений PostgreSQL
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login_form', async (req, res) => {
  const { login, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM login_form WHERE login = $1 AND password = $2',
      [login, password]
    );

    if (result.rows.length > 0) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Login failed');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/documents', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'documents.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
