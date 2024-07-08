import  express  from 'express';
import {requireAuth,isAdmin} from '../middlewares/authMiddleware.js'
import ExpressFormidable from "express-formidable";
import { createProductController } from "../controllers/productController.js"

const router=express.Router();


router.post("/create-product",requireAuth,isAdmin,ExpressFormidable(),createProductController);

export default router;