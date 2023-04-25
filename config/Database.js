import { Sequelize } from "sequelize";
import mysql2 from "mysql2"; // Importa el driver de MySQL

// Crea una instancia de Sequelize y configúrala para usar MySQL como dialecto
const db = new Sequelize('autenticacion_db', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    dialectModule: mysql2 // Especifica el driver a utilizar
});

export default db;
