
import express from 'express';
import dotenv from 'dotenv';
import { initDB, sql } from './config/db.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001
app.use(express.json());


app.post('/api/transactions', async (req, res) => {
  try {
    const { user_id, title, amount, category } = req.body;
    if (!user_id || !title || amount === undefined || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const result = await sql`INSERT INTO transactions (user_id, title, amount, category) VALUES (${user_id}, ${title}, ${amount}, ${category}) RETURNING *`;
    res.status(201).json(result[0]);
    return ;
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.get('/api/transactions', (req, res) => {
    res.send('API is running...');
});

app.get('/api/transactions/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Fetching transactions for userId:', userId);
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId parameter' });
    }
    const transactions = await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.delete('/api/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(parseInt(id))) { // check if id is a valid number
      return res.status(400).json({ error: 'Missing valid transaction ID parameter' });
    }
    const result = await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;
    if (result.length === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully', transaction: result[0] });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
