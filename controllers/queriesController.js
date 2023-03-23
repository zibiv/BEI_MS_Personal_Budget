const { envbDBClient, envbDBPool } = require('../model');

envbDBClient.connect((err) => {
  if(err) {
    console.error('connection err', err.stack);
  } else {
    console.log('connected to the DB');
  }
});

envbDBClient.query("SET SCHEMA 'envb_user';");

envbDBClient.query("SELECT current_user").then(res => console.log(res.rows));

envbDBClient.query("SELECT * FROM users").then(res => console.log(res?.rows))
.catch(err => console.log(err.message)).then(()=>envbDBClient.end());;


