import { Router } from 'express';
const router = Router();
import * as userModel from '../models/userModel.js'

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
        console.log("password")
        const result = await userModel.authenticateUser(user);
        res.status(200).json(result);
    }
    catch(error){

        res.status(200).json({response: error.message});  
    }
});

export default router;