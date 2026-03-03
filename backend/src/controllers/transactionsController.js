import express from 'express';  
const router = express.Router();
import * as transactions from '../models/transactionsModel.js';

router.get('/', async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await transactions.getTransactions(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error('Error fetching transactions controller:', error);
    }
});

router.get('/getTransactionByCategory', async (req, res) => {
    try{
        const userId = req.user.id;
        const category = req.query.category;
        const result = await transactions.getTransactionByCategory(category, userId);
        res.status(200).json(result);
    } catch(error) {  
        res.status(500).json({ "message": error });
    }
});

router.post('/', async (req, res) => {
    try {        
        const transaction = req.body;
        const userId = req.user.id
        const result = await transactions.createTransaction(transaction, userId);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;