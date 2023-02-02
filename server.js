const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4001;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res, next) => {
  res.json({ msg: 'Working...' });
});

app.listen(PORT, () => {
  console.log(`We start on ${PORT} port`);
});
