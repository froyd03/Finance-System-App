import database from '../config/database.js';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export async function createAccount(signUpForm){
    try{

        const {fullName, email, password, confirmPassword} = signUpForm;

        for (const key in signUpForm) {
            if (signUpForm[key] === '') {
                console.log(key);
                throw new Error("Please fill in all fields");
            }
        }

        if(password !== confirmPassword){
            throw new Error("Password and Confirm Password do not match");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await database.query(
            "INSERT INTO users(fullName, email, password) VALUES (?, ?, ?)",
            [fullName, email, hashPassword]
        );
        
        return await authenticateUser({email, password});
       
    }catch(error){
        if(error.code === "ER_DUP_ENTRY") return {"response": "Email already exist" , "status": false};
        return { "response": error.message, "status": false}; 
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
            return {"response": "Incorrect email or password ", "status": false}; 
        }

    }catch(error){
        return {"response": "Incorrect email or password ", "status": false}; 
    }
}

export async function isUserHasActiveTemplate(userId){

    try {
        const [rows] = await database.query(
            `SELECT activeTemplateId FROM users WHERE userId = ?`,
            [userId]
        );
        return rows[0].activeTemplateId !== null;
    } catch (error) {
        console.error('Error checking active template:', error);
        throw error;
    }
}

// const user = {
//     "email": "banataofroyd@gmail.com",
//     "password": "Froydbanatao-03"
// }
// node ./src/models/userModel.js