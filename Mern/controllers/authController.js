import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/authHelper.js";
import JWT from "jsonwebtoken";

//Registration Controller
const registerController = async (req, res) => {
  const { name, email, password, phone, address, role } = req.body;

  try {
    //validations

    if (!name) {
      return res.send({ success: false, message: "Name is required" });
    }
    if (!email) {
      return res.send({ success: false, message: "Email is required" });
    }
    if (!password) {
      return res.send({ success: false, message: "Password is required" });
    }
    if (!phone) {
      return res.send({ success: false, message: "Phone no is required" });
    }
    if (!address) {
      return res.send({ success: false, message: "address is required" });
    }
    if (!role) {
      return res.send({ success: false, message: "role is required" });
    }

    //existing User

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered! Please login",
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      role,
    });
    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User does not exists",
      });
    }
    const matched = await comparePassword(password, user.password);
    if (!matched) {
      return res.status(404).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //JWT token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "User Login Successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//test
const testController = (req, res) => {
  try {
    res.send("Protected Route");
  } catch (error) {}
};

//user-Auth
const userAuthController=(req,res)=>{
  res.status(200).send({ok:true});
}

export { registerController, loginController, testController,userAuthController };
