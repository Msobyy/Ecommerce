import express  from "express";
import {registerController,loginController,testController,userAuthController,forgotPasswordController} from "../controllers/authController.js"
import { isAdmin, requireAuth } from "../middlewares/authMiddleware.js";


//router object
const router=express.Router();

//routes

//REGISTRATION
router.post('/register',registerController);
//LOGIN
router.post('/login',loginController);
//forgot Password
router.post('/forgot-password',forgotPasswordController);
//test
router.get('/test',requireAuth,isAdmin,testController);
//userAuth
router.get('/user-Auth',requireAuth,userAuthController)


export default router   