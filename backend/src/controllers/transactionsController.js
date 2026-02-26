import express from 'express';  
const router = express.Router();
import * as transactions from '../models/transactionsModel.js';

router.get('/', async (req, res) => {
    try {
        const userId = req.user.id;
        console.log('User ID from token:', req.user);
        const result = await transactions.getTransactions(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error('Error fetching transactions controller:', error);
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

router.get('/getUserTemplateCategories', async (req, res) => {
    try {        
        const userId = req.body;
        const result = await transactions.getUserTemplateCategories(userId);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;