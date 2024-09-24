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

const Item = mongoose.model('Item', ItemSchema);

app.post('/api/items', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
})

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));