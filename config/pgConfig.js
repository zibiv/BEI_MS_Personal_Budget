require('dotenv').config({ path: '../.env' });

const config = {
  user: process.env.DBUSER,
  host: 'localhost',
  database: 'envb',
  password: process.env.DBUSER_PASSWORD,
  port: 5432
}

module.exports = config;
