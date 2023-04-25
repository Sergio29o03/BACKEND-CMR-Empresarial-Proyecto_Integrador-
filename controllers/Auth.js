import Users from "../models/Usermodel.js";
import argon2 from "argon2";
import { Sequelize } from "sequelize";


//iniciamos con la variable para el inicio de sesion
export const Login = async (req,res) => {
    const user = await Users.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "El usuario no se encuentra"});

    // Si la cuenta está bloqueada, verificar si ha pasado el tiempo suficiente para desbloquearla
    if (user.blockedUntil && new Date() < user.blockedUntil) {
        const timeRemaining = Math.ceil((user.blockedUntil - new Date()) / 60000); // tiempo restante en minutos
        return res.status(400).json({msg : `Cuenta bloqueada. Inténtelo de nuevo en ${timeRemaining} minutos.`});
    }

    // Verificar si la contraseña coincide
    const match = await argon2.verify(user.password, req.body.password);
    // Si la contraseña no coincide, aumentar el número de intentos de inicio de sesión fallidos
    if(!match) {
        await user.update({failedLoginAttempts: user.failedLoginAttempts + 1});
        if (user.failedLoginAttempts >= 3) {
            await user.update({blockedUntil: new Date(new Date().getTime() + 2*60*60*1000)}); // bloquear la cuenta durante 2 horas
            return res.status(400).json({msg : "Demasiados intentos de inicio de sesión fallidos. Cuenta bloqueada durante 2 horas."});
        } else {
            return res.status(400).json({msg : "Contraseña incorrecta."});
        }
    }

    // Restablecer el número de intentos de inicio de sesión fallidos
    await user.update({failedLoginAttempts: 0, blockedUntil: null});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    // Devolver la respuesta exitosa
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