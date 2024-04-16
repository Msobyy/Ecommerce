import userModel from "../models/userModel.js";
import { hashPassword } from "../utils/authHelper.js";


const registerController=async(req,res)=>{
    const{name,email,password,phone,address,role}=req.body;

   
    try {
         //validations

    if(!name){
        return res.send({error:"Name is required"});
    }
    if(!email){
        return res.send({error:"Email is required"});
    }
    if(!password){
        return res.send({error:"Password is required"});
    }
    if(!phone){
        return res.send({error:"Phone no is required"});
    }
    if(!address){
        return res.send({error:"address is required"});
    }
    if(!role){
        return res.send({error:"role is required"});
    }

    //existing User

    const existingUser=await userModel.findOne({email});
    if(existingUser){
        return res.status(200).send({
            success:true,
            message:"Already registered! Please login"
        })
    }

    const hashedPassword=await hashPassword(password);
    const newUser= await userModel.create({name,email,password:hashedPassword,address,phone,role});
    res.status(201).send({
        success:true,
        message:"User Registered Successfully",
        user:newUser
    });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
} 



export {
    registerController
}