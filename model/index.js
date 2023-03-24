const Client = require('pg').Client;
const config = require('../config/pgConfig');
const envbDBClient = new Client(config);

const Pool = require('pg').Pool;
const envbDBPool = new Pool(config);

module.exports = {
  envbDBClient,
  db: (query, params) => envbDBPool.query(query, params),
};
