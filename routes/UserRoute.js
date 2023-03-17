import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/Users.js"
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

//utilizamos express para las rutas
const router = express.Router();

router.get('/users',verifyUser,adminOnly, getUsers);
//identificamos el usuario y lo llamamos con su respectivo metodo
router.get('/users/:id',verifyUser,adminOnly,  getUserById);
router.post('/users', verifyUser,adminOnly, createUser);
router.patch('/users/:id', verifyUser,adminOnly, updateUser);
router.delete('/users/:id', verifyUser,adminOnly, deleteUser);

export default router;
