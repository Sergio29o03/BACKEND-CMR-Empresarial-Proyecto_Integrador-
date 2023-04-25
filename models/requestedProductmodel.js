import { Sequelize, DataTypes } from "sequelize";
import db  from "../config/Database.js";
import Products from "./Productmodel.js";
import Quotations from "./Quotationsmodel.js";

const RequestedProducts = db.define("requested_products", {
    req_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    qu_ident: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
});

Products.hasMany(RequestedProducts);
RequestedProducts.belongsTo(Products, { foreignKey: "product_id" });

export default RequestedProducts;

// define la relación después de haber definido todos los modelos
export function associate() {
    Quotations.hasMany(RequestedProducts);
    RequestedProducts.belongsTo(Quotations, { foreignKey: "qu_ident" });
}