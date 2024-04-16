import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

const requireAuth = async (req, res, next) => {
    try {
        const decodedToken = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user=decodedToken;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            error
        })
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        console.log(user);
        if (user.role !== 1) {
            res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            message:"Admin Middleware Error",
            error
        })
    }
};

export { requireAuth ,isAdmin};
