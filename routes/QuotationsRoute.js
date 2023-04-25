import express from "express";
import {
    getAllQuotations,
    createQuotation,
    createFinalQuotation,
    getIdentQuotation,
    getQuotationValueForDay,
    getQuotationForEdit,

} from "../controllers/Quotations.js"
import { verifyUser } from "../middleware/AuthUser.js";


//utilizamos express para las rutas
const router = express.Router();

// QUOTATIONS ROUTES
// get all quotations
router.get('/quotations', verifyUser,getAllQuotations)
// get biggest qu_ident
router.get('/quotations/ident',verifyUser, getIdentQuotation)
// create quotations
router.post('/quotations/add', verifyUser,createQuotation)
// create final quotation
router.put('/quotations', verifyUser,createFinalQuotation)
// get quotation dara for edition
router.put('/quotations/edit', verifyUser,getQuotationForEdit)
// get quotation value for day
router.put('/dashboard', verifyUser,getQuotationValueForDay)

export default router;