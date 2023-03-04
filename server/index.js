require('dotenv/config');
const ClientError = require('./client-error');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
// const cors = require('cors');
// const axios = require('axios');
const path = require('path');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(express.json());
app.use(staticMiddleware);

app.get('/api/products', (req, res, next) => {
  const sql = `
    select *
      from "products"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }
  const sql = `
    select *
      from "products"
      where "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        next(new ClientError(`cannot find product with "productId" ${productId}`, 404));
      } else {
        res.json(product);
      }
    }
    )
    .catch(err => next(err));

});

app.get('/api/categories', (req, res, next) => {
  const sql = `
    select *
      from "categories"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/categories/:id', (req, res, next) => {
  const params = [req.params.id];
  const sql = `
    select *
      from "categories", "products"
      where "categories"."categoryId" = "products"."categoryId"
      and "categories"."categoryId" = $1
  `;
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
