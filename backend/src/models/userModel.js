import database from '../config/database.js';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export async function createAccount({fullName, email, password}){
    try{

        const hashPassword = await bcrypt.hash(password, 10);
        await database.query(
            "INSERT INTO users(fullName, email, password) VALUES (?, ?, ?)",
            [fullName, email, hashPassword]
        );
        
        return await authenticateUser({email, password});
       
    }catch(error){
        if(error.code === "ER_DUP_ENTRY") return {"response": "Email already exist" , "status": false};
        return {"response": "Something went wrong, try again.", "status": false, "error": error.message}; 
    }
}


export async function authenticateUser({email, password}){
    try{

        const [user] = await database.query(
            "SELECT userId, fullName, email, password FROM users WHERE email = ?", [email]
        );
        const isMatch = await bcrypt.compare(password, user[0].password);

        if(isMatch){
            const payload = {
                id: user[0].userId, 
                email: user[0].email, 
                fullName: user[0].fullName
            }
            const token = jwt.sign(payload, process.env.JWTSECRET, {expiresIn: "1h"});

            if(token) return {"response": token, "status": true};  
            else throw new Error("Error login! no token");
            
        }else{
            return {"response": "email or password incorrect", "status": false}; 
        }

    }catch(error){
        return {"response": error.message , "status": false}; 
    }
}

// const user = {
//     "email": "banataofroyd@gmail.com",
//     "password": "Froydbanatao-03"
// }
// node ./src/models/userModel.js