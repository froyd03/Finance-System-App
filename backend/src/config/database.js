import dotenv from 'dotenv';
dotenv.config();
import mysql2 from 'mysql2';

const database = mysql2.createPool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: false
    }
}).promise();



export default database;