import express from 'express';
import cors from 'cors';
const app = express();

import userController from './src/controllers/userController.js';
import transactionsController from './src/controllers/transactionsController.js';
import templatesController from './src/controllers/templatesController.js';
import authMiddleware from './src/middlewares/authMiddleware.js';

app.use(express.json());
app.use(cors());

app.use('/user', userController);
app.use('/transactions', authMiddleware, transactionsController);
app.use('/templates', templatesController);

app.listen(5000, () => {
    console.log("port in 5000");
})