import express from 'express'
const app = express();
import userController from './src/controllers/userController.js';
import transactionsController from './src/controllers/transactionsController.js';

app.use(express.json())
app.use('/user', userController);
app.use('/transactions', transactionsController);

app.listen(5000, () => {
    console.log("port in 5000");
})