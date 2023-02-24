require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
// const pg = require('pg');

const app = express();

app.use(express.json());

app.use(staticMiddleware);

app.get('/hello', (req, res) => {
  res.json({ hello: 'world' });
});
app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
