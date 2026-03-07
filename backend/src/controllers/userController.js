import { Router } from 'express';
const router = Router();
import * as userModel from '../models/userModel.js'
import authMiddleware from '../middlewares/authMiddleware.js'

router.post('/register', async (req, res) => {

    try{
        const newUser = req.body;
        const result = await userModel.createAccount(newUser);
        res.status(201).json(result); 
    }catch(error){
        res.status(401).json({response: error.message});
    }
})

router.post("/login", async (req, res) => {

    try{
        const user = req.body;
        const result = await userModel.authenticateUser(user);
        res.status(200).json(result);
    }
    catch(error){
        res.status(401).json({response: error.message});  
    }
});

router.get('/user-balance', authMiddleware, async (req, res) => {
    try{
        const userId = req.user.id;
        const result = await userModel.getUserBalance(userId);
        res.status(200).json(result);
    }
    catch(error){
        res.status(401).json({response: error.message});  
    }
})

export default router;