import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/authHelper.js";
import JWT from "jsonwebtoken";

//Registration Controller
const registerController = async (req, res) => {
  const { name, email, password, phone, address, role,question } = req.body;

  try {
    //validations

    if (!name) {
      return res.status(400).send({ success: false, message: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ success: false, message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ success: false, message: "Password is required" });
    }
    if (!phone) {
      return res.status(400).send({ success: false, message: "Phone no is required" });
    }
    if (!address) {
      return res.status(400).send({ success: false, message: "address is required" });
    }
    if (!question) {
      return res.status(400).send({ success: false, message: "Answer is required" });
    }
    if (!role) {
      return res.status(400).send({ success: false, message: "role is required" });
    }

    //existing User

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(404).send({
        success: false,
        message: "Already registered! Please login",
      });
    }

    //hashing

    const hashedPassword = await hashPassword(password);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      question,
      role
    });

    //response
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
    //validations
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({ success: false, message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ success: false, message: "Password is required" });
    }

    //findind user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User does not exists",
      });
    }

    //comparing password
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

    //response
    res.status(200).send({
      success: true,
      message: "User Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        role:user.role
      },
      token,
    });
  } catch (error) {
    //error
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//forgot-password
const forgotPasswordController = async (req, res) => {
  try {
    // Validations
    const { email, newPassword, question } = req.body;
    if (!email) {
      return res.status(400).send({ success: false, message: "Email is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ success: false, message: "Password is required" });
    }
    if (!question) {
      return res.status(400).send({success:false, message: "Answer is required" });
    }

    // Find user
    const user = await userModel.findOne({ email, question });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Answer to Question"
      });
    }

    // Hashing
    const hashedPassword = await hashPassword(newPassword);

    // Updating user 
    if (hashedPassword && user) {
      await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
    }

    res.status(200).send({
      success: true,
      message: "Password updated successfully"
    });

  } catch (error) {
    // Error
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong"
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
const userAuthController = (req, res) => {
  //send response ok if user signed in
  res.status(200).send({ ok: true });
};

export {
  registerController,
  loginController,
  testController,
  userAuthController,
  forgotPasswordController,
};
