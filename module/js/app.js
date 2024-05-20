const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./module/js/app.js'); // Исправленный путь

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to Qazaqstroy API');
});

// Маршрут для добавления записи в login_form
app.post('/login_form', async (req, res) => {
  const { login, password } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO login_form (login, password) VALUES ($1, $2) RETURNING *',
      [login, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Маршрут для добавления записи в documents
app.post('/documents', async (req, res) => {
  const { date, status, type, number, organization } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO documents (date, status, type, number, organization) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [date, status, type, number, organization]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
