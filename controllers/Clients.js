import Clients from "../models/ClientsModel.js";
import Users from "../models/UserModel.js";
import {Op} from "sequelize";

export const getClients = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Clients.findAll({
                attributes:['uuid','name','email','nit','number'],
                include:[{
                    model: Users,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Clients.findAll({
                attributes:['uuid','name','email','nit','number'],
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

export const getClientById = async(req, res) =>{
    try {
        const client = await Clients.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!client) return res.status(404).json({msg: "Datos no encontrados"});
        let response;
        if(req.role === "admin"){
            response = await Clients.findOne({
                attributes:['uuid','name','email','nit','number'],
                where:{
                    id: client.id
                },
                include:[{
                    model: Users,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Clients.findOne({
                attributes:['uuid','name','email','nit','number'],
                where:{
                    [Op.and]:[{id: client.id}, {userId: req.userId}]
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

export const createClient = async(req, res) =>{
    const {name, email, nit,number} = req.body;
    try {
        await Clients.create({
            name: name,
            email:email,
            nit:nit,
            number:number,
            userId: req.userId
        });
        res.status(201).json({msg: "Cliente Creado exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateClient = async(req, res) =>{
    try {
        const client = await Clients.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!client) return res.status(404).json({msg: "Datos no encontrados"});
        const {name,email,nit,number} = req.body;
        if(req.role === "admin"){
            await Clients.update({name, email,nit,number},{
                where:{
                    id: client.id
                }
            });
        }else{
            if(req.userId !== client.userId) return res.status(403).json({msg: "Acceso restringido"});
            await Clients.update({name,email,nit,number},{
                where:{
                    [Op.and]:[{id: client.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Cliente actualizado exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteClient = async(req, res) =>{
    try {
        const client = await Clients.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!client) return res.status(404).json({msg: "Datos no encontrados"});
        const {name,email,nit,number} = req.body;
        if(req.role === "admin"){
            await Clients.destroy({
                where:{
                    id: client.id
                }
            });
        }else{
            if(req.userId !== client.userId) return res.status(403).json({msg: "Aceeso restringido"});
            await Clients.destroy({
                where:{
                    [Op.and]:[{id: client.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Cliente eliminado exitosamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
