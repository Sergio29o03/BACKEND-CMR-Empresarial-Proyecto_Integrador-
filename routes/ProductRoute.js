import express from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/Products.js"
import { verifyUser } from "../middleware/AuthUser.js";


//utilizamos express para las rutas
const router = express.Router();

router.get('/products',verifyUser,getProducts);
//identificamos el usuario y lo llamamos con su respectivo metodo
router.get('/products/:id', verifyUser,getProductById);
router.post('/products', verifyUser, createProduct);
router.patch('/products/:id', verifyUser, updateProduct);
router.delete('/products/:id',verifyUser, deleteProduct);
export default router;