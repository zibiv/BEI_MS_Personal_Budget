const express = require('express');
const morgan = require('morgan');
const envelopes = require('./routes/api/envelopes.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4001;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/api/v1/envelopes', envelopes);


app.listen(PORT, () => {
  console.log(`We start on ${PORT} port`);
});
