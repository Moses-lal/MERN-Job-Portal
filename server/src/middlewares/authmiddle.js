import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

export const Protect = async (req, res, next) => {
  try {
    const token = req.cookies.tokencookie;
    if (!token) {
      const error = new Error("Not Authorized, No Token Found");
      error.statusCode = 401;
      return next(error);
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      const error = new Error("Token Expired, Please Login Again");
      error.statusCode = 401;
      return next(error);
    }

    const verifiedUser = await User.findById(decode.id);
    if (!verifiedUser) {
      const error = new Error("User Not Found, Invalid Token");
      error.statusCode = 401;
      return next(error);
    }

    req.user = verifiedUser;
    next();

    
  } catch (error) {
    next(error);
  }
};




export const isRecruiter = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    const error = new Error("Access Denied, Recruiter Only Resource");
    error.statusCode = 403;
    return next(error);
  }
  next();
};