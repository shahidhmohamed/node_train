const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected Successfully'))
    .catch(err => console.log(err));

const ItemSchema = new mongoose.Schema({
    name: String,
    description: String,
});

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
})

const Product = mongoose.model('Product', ProductSchema);

const Item = mongoose.model('Item', ItemSchema);


app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
})

app.post('/api/items', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
})

app.get('/api/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
})

app.delete('/api/items/:id', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item Deleted" });
})

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));