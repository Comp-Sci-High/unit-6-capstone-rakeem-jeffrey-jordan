const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Item = mongoose.model('Item', new mongoose.Schema({
  name: String,
  image: String,
  category: String,
  price: Number,
  purchaseLink: String
}), 'Items');

app.get('/api/items', async (req, res) => {
  const items = await Item.find({});
  res.json(items);
});

app.post('/api/items', async (req, res) => {
  const newItem = await Item.create(req.body);
  res.json(newItem);
});

app.patch('/api/items/:id', async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedItem);
});

app.delete('/api/items/:id', async (req, res) => {
  const deletedItem = await Item.findByIdAndDelete(req.params.id);
  res.json(deletedItem);
});

app.listen(3000, () => {
  console.log('Server running.');
});