import express from 'express';  
const router = express.Router();
import * as transactions from '../models/transactionsModel.js';

router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;
        const result = await transactions.getTransactions(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {        
        const transaction = req.body;
        const result = await transactions.createTransaction(transaction);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;