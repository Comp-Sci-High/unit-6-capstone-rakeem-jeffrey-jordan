const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Item = mongoose.model('Item', new mongoose.Schema({
  name: String,
  image: String,
  category: String,
  price: Number,
  purchaseLink: String,
  size: String
}), 'Items');

app.get('/', async (req, res) => {
  const items = await Item.find({});
  res.render('Clothing', { items });
});

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

async function startServer() {
   
    await mongoose.connect("mongodb+srv://SE12:CSH2025@cluster0.xfcbvkb.mongodb.net/codealong?retryWrites=true&w=majority&appName=Cluster0");

    app.listen(3000, () => {
        console.log(`Server running.`);
    });
}

startServer();