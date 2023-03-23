const express = require('express');
const morgan = require('morgan');
const envelopes = require('./routes/api/envelopes.js');
const users = require('./routes/api/users.js');
const categories = require('./routes/api/categories.js');
require('dotenv').config();

console.log(process.env.PORT);

const app = express();
const PORT = process.env.PORT || 4001;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/api/v1/envelopes', envelopes);
app.use('/api/v1/users', users);
app.use('/api/v1/categories', categories);


app.listen(PORT, () => {
  console.log(`We start on ${PORT} port`);
});
