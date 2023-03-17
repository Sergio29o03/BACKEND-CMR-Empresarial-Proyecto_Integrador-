import { Sequelize } from "sequelize";
// creamos constante de bases de datos
const db = new Sequelize('autenticacion_db','root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;

