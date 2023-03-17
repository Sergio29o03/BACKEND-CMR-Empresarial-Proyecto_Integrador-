import Users  from "../models/Usermodel.js";

const getUserById = async (id) => {
    const user = await Users.findOne({ 
        where: {
            uuid: id
        }
    });
    return user;
}

export const verifyUser = async(req,res,next) => {
    if(!req.session.userId){
        return res.status(401).json({msg : "Por favor inicia sesion"})
    }
    const user = await getUserById(req.session.userId);
    if(!user) return res.status(404).json({msg: "El usuario no se encuentra"});
    req.userId = user.id;
    req.role = user.role;
    next();
}

export const adminOnly = async(req,res,next) => { /* solo el administrador tiene estos permisos */
    const user = await getUserById(req.session.userId);
    if(!user) return res.status(404).json({msg: "El usuario no se encuentra"});
    if(user.role !== "admin") return res.status(403).json({msg: "aceeso prohibido"}); 
    next();
}