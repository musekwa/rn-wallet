
import express from 'express';
import { createTransaction, deleteTransactionById, getTransactionsByUserId, getTransactionSummary } from '../controllers/transactionsController.js';

const router = express.Router();

router.post('/', createTransaction)
router.get('/:userId', getTransactionsByUserId)
router.delete('/:id', deleteTransactionById)
router.get('/summary/:userId', getTransactionSummary);

export default router;