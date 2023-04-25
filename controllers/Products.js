import Product from "../models/Productmodel.js";
import Users from "../models/UserModel.js";
import {Op} from "sequelize";

export const getProducts = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Product.findAll({
                attributes:['uuid','name','price','description'],
                include:[{
                    model: Users,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Product.findAll({
                attributes:['uuid','name','price','description'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: Users,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getProductById = async(req, res) =>{
    try {
        const product = await Product.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Datos no encontrados"});
        let response;
        if(req.role === "admin"){
            response = await Product.findOne({
                attributes:['uuid','name','price','description'],
                where:{
                    id: product.id
                },
                include:[{
                    model: Users,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Product.findOne({
                attributes:['uuid','name','price','description'],
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                },
                include:[{
                    model: Users,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createProduct = async(req, res) =>{
    const {name, price, description} = req.body;
    try {
        await Product.create({
            name: name,
            price: price,
            description:description,
            userId: req.userId
        });
        res.status(201).json({msg: "Producto Creado exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateProduct = async(req, res) =>{
    try {
        const product = await Product.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Datos no encontrados"});
        const {name, price, description} = req.body;
        if(req.role === "admin"){
            await Product.update({name, price,description},{
                where:{
                    id: product.id
                }
            });
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg: "Acceso restringido"});
            await Product.update({name, price, description},{
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Product actualizado exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteProduct = async(req, res) =>{
    try {
        const product = await Product.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Datos no encontrados"});
        const {name, price , description} = req.body;
        if(req.role === "admin"){
            await Product.destroy({
                where:{
                    id: product.id
                }
            });
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg: "Aceeso restringido"});
            await Product.destroy({
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Producto eliminado exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


