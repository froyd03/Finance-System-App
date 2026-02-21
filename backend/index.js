import express from 'express';
const app = express();

import userController from './src/controllers/userController.js';
import transactionsController from './src/controllers/transactionsController.js';
import templatesController from './src/controllers/templatesController.js';

app.use(express.json());

app.use('/user', userController);
app.use('/transactions', transactionsController);
app.use('/templates', templatesController);

app.listen(5000, () => {
    console.log("port in 5000");
})