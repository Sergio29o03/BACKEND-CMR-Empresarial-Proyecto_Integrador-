import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "../models/Usermodel.js";

//importamos la base de datos y creamos la constante
const { DataTypes } = Sequelize;

//nombre de la tabla
const Clients = db.define('clients', {
    //seleccionamos el tipo de usuarios
    //Identificador Único Universal = uuid, se usa para identificar de manera unica la informacion de la base de datos
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
            //esto significa que este campo no puede ser nulo ni tampoco una cadena vacia
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
            //esto significa que el numero de caracteres minimo es 3 y el maximo es 100
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
            //esto significa que el numero de caracteres minimo es 3 y el maximo es 100
        }
    },
    nit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 11]
        }},
    number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 11]
            }
        }
    
    //freezeTableName: true, Sequelize no intentará cambiar el nombre de 
    //la tabla en la base de datos a una forma pluralizada basada en el nombre del modelo, sino que utilizará el mismo nombre definido para el modelo.
    //freezeTableName: true
    });

//Sincronizar el modelo de clientes con la base de datos
Clients.sync({ alter: true })
    .then(() => {
        console.log('Modelo de clientes sincronizado correctamente con la base de datos');
    })
    .catch((error) => {
        console.error('Error al sincronizar modelo de clientes con la base de datos', error);
    });

//aqui hago la relacion de usuarios con productos
Users.hasMany(Clients)
//aqui configuramos la clave externa de usuario 
Clients.belongsTo(Users, { foreignKey: "userId" })

export default Clients;
