import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

app.get('/', (req, res, next) => {
  res.send('API is running..');
});

app.get('/api/products', (req, res, next) => {
  res.send(products);
});

app.get('/api/products/:id', (req, res, next) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
