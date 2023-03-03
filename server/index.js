require('dotenv/config');
const ClientError = require('./client-error');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
// const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();

app.use(staticMiddleware);

app.get('/catalog', (req, res, next) => {
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

app.get('/product/:productId', (req, res, next) => {
  if (!req.params.productId) {
    throw new ClientError(400, 'productId is required');
  }
  const options = {
    method: 'GET',
    url: `https://dummyjson.com/products/${req.params.productId}`
  };
  axios.request(options).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error(error);
    next();
  });
});

app.get('/product/category/:category', (req, res, next) => {
  if (!req.params.category) {
    throw new ClientError(400, 'category is required');
  }
  const options = {
    method: 'GET',
    url: `https://dummyjson.com/products/category/${req.params.category}`
  };
  axios.request(options).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.error(error);
    next();
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
