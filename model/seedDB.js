const { envbDBClient, envbDBPool } = require('../model');

const users = require('./users.json');
const envelopes = require('./envelopes.json');
const categories = require('./categories.json');

// envbDBClient.connect((err) => {
//   if(err) {
//     console.error('connection err', err.stack);
//   } else {
//     console.log('connected to the DB');
//   }
// });


//очистка имеющихся таблиц
envbDBPool.query('TRUNCATE  envb_user.users, envb_user.envelopes, envb_user.categories');
//циклы для заполнения таблиц
users.forEach(user => {
  console.log('1');
  const values = Object.values(user);
  envbDBPool.query('INSERT INTO envb_user.users VALUES ($1, $2, $3, $4, $5)', values);
});

categories.forEach( category => {
  console.log('2');
  const values = Object.values(category);
  envbDBPool.query('INSERT INTO envb_user.categories VALUES ($1, $2, $3)', values)
});

envelopes.forEach( envelope => {
  console.log('3');
  const values = Object.values(envelope);
  envbDBPool.query('INSERT INTO envb_user.envelopes VALUES ($1, $2, $3, $4, $5)', values)
});


