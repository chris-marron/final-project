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
    throw new ClientError(`productId must be a positive integer, not ${productId}`, 400);
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
  if (!parseInt(req.params.id, 10)) {
    throw new ClientError('id must be a positive integer', 400);
  }
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

app.post('/api/carts', (req, res, next) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    throw new ClientError('productId and quantity are required fields', 400);
  }
  const sql = `
    INSERT INTO "carts" ("productId", "quantity")
    VALUES ($1, $2)
    RETURNING *`;
  const params = [productId, quantity];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));

});

app.put('/api/carts/:cartId', (req, res, next) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    throw new ClientError('productId and quantity are required fields', 400);
  }
  const cartId = parseInt(req.params.cartId, 10);
  if (!Number.isInteger(cartId) || cartId <= 0) {
    throw new ClientError(`cartId must be a positive integer, not ${cartId}`, 400);
  }
  const sql = `
    UPDATE "carts"
        SET "productId" = $1,
            "quantity" = $2
        WHERE "cartId" = $3
        RETURNING *`;
  const params = [productId, quantity, cartId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(`cannot find cart with "cartId" ${cartId}`, 404);
      } else {
        res.status(200).json(result.rows[0]);
      }
    }
    )
    .catch(err => next(err));

});

app.delete('/api/carts/:cartId', (req, res, next) => {
  const cartId = parseInt(req.params.cartId, 10);
  if (!Number.isInteger(cartId) || cartId <= 0) {
    throw new ClientError(`cartId must be a positive integer, not ${cartId}`, 400);
  }
  const sql = `
    DELETE FROM "carts"
    WHERE "cartId" = $1
    RETURNING *`;
  const params = [cartId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(`cannot find cart with "cartId" ${cartId}`, 404);
      } else {
        res.status(204).json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.get('/carts', (req, res, next) => {
  const sql = `
    SELECT *
      FROM "carts"
      JOIN "products" using ("productId")
      `;
  db.query(sql)
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
