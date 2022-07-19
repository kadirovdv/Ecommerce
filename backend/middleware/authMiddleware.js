import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

const protect = expressAsyncHandler(async (requset, response, next) => {
    let token;
    const authorization = requset.headers.authorization
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            requset.user = await User.findById(decoded.id).select("-password")

            console.log(decoded);

            next(); 
        } catch (error) {
            response.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if(!token) {
        response.status(401);
        throw new Error("Not authorized, no token")
    }

    // next();
})

const admin  = (request, response, next) => {
    if(request.user && request.user.isAdmin) {
        next()
    } else {
        response.status(401);
        throw new Error("Not Atuthorized as an admin");
    }
}

export { protect, admin }