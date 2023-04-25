import express from "express";
import {
createReqProduct,
deleteReqProduct

} from "../controllers/RequestedProducts.js"
import { verifyUser } from "../middleware/AuthUser.js";


//utilizamos express para las rutas
const router = express.Router();

// REQUESTED PRODUCTS
//  create requested product
router.post('/requestedproduct', verifyUser,createReqProduct)
router.delete('/requestedproduct',verifyUser, deleteReqProduct)


export default router;