const express = require('express');
const { Pool } = require('pg'); // Destructure Pool from the pg module
const cors = require('cors');

const app = express();
app.use(express.json({ limit: '50mb' }));
const port = 5001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'openpg',
    host: 'localhost',
    database: 'my_erp_db',
    password: 'openpgpwd',
    port: 5432,
});

pool.connect()
    .then(client => {
        console.log('Connected to PostgreSQL successfully');
        client.release();
    })
    .catch(err => {
        console.error('Error connecting to PostgreSQL', err.stack);
    });

app.get('/test-db', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        client.release();
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to the database');
    }
});

app.post('/api/products', async (req, res) => {
    const { name, description, item_code, img, sales_price, internal_reference } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO products (name, description, item_code, sales_price, internal_reference, img) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, description, item_code, sales_price, internal_reference, img]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error Creating Product', error);
        res.status(500).send('Server Error');
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.status(200).json(result.rows)
    }
    catch (error) {
        console.error('Error fetching Products', error);
        res.status(500).send('Server Error');
    }
})


app.delete('/api/products/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Product not Found" })
        }
        res.status(200).json({ message: "Product Deleted Successfully" })
    } catch (error) {
        console.error("Error Deleting Product", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
});


app.listen(port, () => console.log(`Server running on port ${port}`));
