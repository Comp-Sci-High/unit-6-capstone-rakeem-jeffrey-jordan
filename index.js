const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.static(__dirname + "/public"));

app.use(express.json());

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
  res.render('clothing.ejs', { items });
});

app.get('/api/items', async (req, res) => {
  const items = await Item.find({});
   res.json(items);
});

app.post("/new/items", async (req, res) => {
  const newItem = await new Item({
   name: req.body.name,
  image: req.body.image,
  category: req.body.category,
  price: req.body.price,
  purchaseLink: req.body.purchaseLink,
  size: req.body.size
  }).save();

  res.json(newItem);
});

app.patch("/api/items", async (req, res) => {
const response = 
await Item.findOneAndUpdate({
   name: req.body.name,
  image: req.body.image,
  category: req.body.category,
  price: req.body.price,
  purchaseLink: req.body.purchaseLink,
  size: req.body.size
  })
res.json(response);
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