const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'qazaqstroy-db',
  password: 'yourpassword',
  port: 5432,
});

module.exports = pool;
