// lib/db.js
import mysql from 'mysql2/promise';

export const dbConnection = mysql.createPool({
    host: "localhost",
    port: 3306,     // tu host
    user: "root",     // usuario
    password: "123456", // contraseña
    database: "re-cars", // base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});