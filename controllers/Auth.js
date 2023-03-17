import Users from "../models/Usermodel.js";
import argon2 from "argon2";
//iniciamos con la variable para el inicio de sesion
export const Login = async (req,res) => {
    const user = await Users.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "El usuario no se encuentra"});
    //verificamos que la conraseña relacionada con ese usuario sea correcta
    const match = await argon2.verify(user.password, req.body.password);
    //si la contraseña no coincide devolvemos mensaje de error
    if(!match) return res.status(400).json({msg : "contraseña incorrecta"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    //analizo la respuesta
    res.status(200).json({uuid,name , email , role});

}

export const Me = async(req , res) => {
    if(!req.session.userId){
        return res.status(401).json({msg : "Por favor inicia sesion"})
    }
    const user = await Users.findOne({
        attributes:['uuid','name','email','role'],
        where: {
            uuid: req.session.userId

        }
    });
    if(!user) return res.status(404).json({msg: "El usuario no se encuentra"});
    res.status(200).json(user)
}


export const logOut = (req , res) => {
    // eliminamos la sesion
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "No se pudo cerrar la sesion"});
        res.status(200).json({msg : "te has desconectado"})
    });

}