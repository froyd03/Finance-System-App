import dotenv from 'dotenv';
dotenv.config();
import mysql2 from 'mysql2';

const database = mysql2.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise();

export default database;