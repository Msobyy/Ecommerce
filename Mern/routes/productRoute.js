import  express  from 'express';
import {requireAuth,isAdmin} from '../middlewares/authMiddleware.js'
import ExpressFormidable from "express-formidable";
import { createProductController, deleteProductController, getAllProductController, getProductPhotoController, getSingleProductController, updateProductController } from "../controllers/productController.js"

const router=express.Router();


router.post("/create-product",requireAuth,isAdmin,ExpressFormidable(),createProductController);
router.put("/update-product/:pid",requireAuth,isAdmin,ExpressFormidable(),updateProductController);

router.get("/get-products",getAllProductController);
router.get("/get-product/:pid",getSingleProductController);

//getting photos separately for better performance
router.get("/product-photo/:pid",getProductPhotoController)

router.delete("/delete-product/:pid",requireAuth,isAdmin,deleteProductController)


export default router;