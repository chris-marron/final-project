require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
// const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(staticMiddleware);

app.get('/products', (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://dummyjson.com/products'
  };
  axios.request(options).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error(error);
    next();
  });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
