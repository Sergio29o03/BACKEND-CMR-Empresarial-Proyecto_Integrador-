import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Users from "./Usermodel.js";

//importamos la base de datos y creamos la constante
const {DataTypes} = Sequelize;

//nombre de la tabla
const Products = db.define('product',{
    //seleccionamos el tipo de usuarios
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
            //esto significa que este campo no puede ser nulo ni tampoco una cadena vacia
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len: [3,100]
            //esto significa que el numero de caracteres minimo es 3 y el maximo es 100
        }
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    }

},{
//freezeTableName: true, Sequelize no intentará cambiar el nombre de 
//la tabla en la base de datos a una forma pluralizada basada en el nombre del modelo, sino que utilizará el mismo nombre definido para el modelo.
    freezeTableName: true
});

//aqui hago la relacion de usuarios con productos
Users.hasMany(Products)
//aqui configuramos la clave externa de usuario 
Products.belongsTo(Users,{foreignKey:"userId"})
export default Products