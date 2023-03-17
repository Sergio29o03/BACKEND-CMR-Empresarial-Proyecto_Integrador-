import express from "express";
import {Login, logOut, Me} from "../controllers/Auth.js";

//utilizamos express para las rutas
const router = express.Router();

//identificamos el usuario y lo llamamos con su respectivo metodo
router.get('/me',Me);
router.post('/login', Login);
router.delete('/logout', logOut);
export default router;