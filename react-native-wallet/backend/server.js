
import express from 'express';
import dotenv from 'dotenv';
import { initDB } from './config/db.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
})

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
