import { Sequelize, DataTypes } from "sequelize";
import db  from "../config/Database.js";
import Clients from "./Clientsmodel.js";
import RequestedProducts from "./requestedProductmodel.js";
import Users from "./Usermodel.js";

const Quotations = db.define("quotations", {
    quotation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    qu_created: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW,
        allowNull: false,
    },
    qu_value: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    qu_ident: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
    },userId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    client_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
});

Clients.hasMany(Quotations);
Quotations.belongsTo(Clients, { foreignKey: "client_id" });
RequestedProducts.hasMany(Quotations);
Quotations.belongsTo(RequestedProducts, { foreignKey: "req_id" });
Users.hasMany(Quotations);
Quotations.belongsTo(Users, { foreignKey: "userId" });


export default Quotations;