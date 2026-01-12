import bcrypt from "bcrypt";
import user from "../models/usermodel.js";
import { genauthtoken } from "../utils/token.js";
import OTP from "../models/otpModel.js";
import { sendForgetPasswordOTP } from "../utils/sendEmail.js";



export const register = async (req, res, next) => {
  try {
    const { email, password, phone, fullName , role } = req.body;

    if (!email || !password || !phone || !fullName || !role) {
      const error = new Error("all fields required ");
      error.statuscode = 400;
      return next(error);
    }

    const existinguser = await user.findOne({ email });
    if (existinguser) {
      const error = new Error("already exitss");
      error.statuscode = 409;
      return next(error);
    }

    const photo = `https://placehold.co/600x400?text=${fullName
      .charAt(0)
      .toUpperCase()}`;

    const hashedpassword = await bcrypt.hash(password, 10);

    const newuser = await user.create({
      fullName,
      email,
      phone,
      photo,
      password: hashedpassword,
      role,
    });

    res
      .status(201)
      .json({ message: `Welcome to JobPortal ${newuser.fullName}` });
  } catch (error) {
    console.log(error);
  }
};


export const login = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("all fields required ");
      error.statuscode = 400;
      return next(error);
    }


    const existinguser = await user.findOne({ email });
    if (!existinguser) {
      const error = new Error("you need to register frist ");
      error.statuscode = 401;
      return next(error);
    }


    const match = await bcrypt.compare( password, existinguser.password);
    if (!match) {
      const error = new Error("password does not match ");
      error.statuscode = 401;
      return next(error);
    }


    genauthtoken(existinguser,res);


    res.status(200).json({ message: `Welcome Back ${existinguser.fullName}` , data:existinguser});


  } catch (error) {
    next(error);
  }
};


export const logout = async (req, res, next) => {
  try {
    res.clearCookie("tokencookie");
    res.status(200).json({ message: "logout succesfull " });
  } catch (error) {
    next(error);
  }
};




export const SendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      const error = new Error("All Fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("User not Registred");
      error.statusCode = 401;
      return next(error);
    }

    const otp = Math.floor(Math.random() * 900000 + 100000).toString();
    const hashedOTP = await bcrypt.hash(otp, 10);
    await OTP.create({ email, otp: hashedOTP });

    if (!sendForgetPasswordOTP(email, otp)) {
      const error = new Error("Error Sending OTP");
      error.statusCode = 400;
      return next(error);
    }

    res.status(200).json({ message: "OTP sent Sucessfull" });
  } catch (error) {
    next(error);
  }
};


export const VerifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      const error = new Error("All Fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingOTP = await OTP.findOne({ email });
    if (!existingOTP) {
      const error = new Error("OTP Expired");
      error.statusCode = 404;
      return next(error);
    }

    const isVerified = await bcrypt.compare(otp, existingOTP.otp);
    if (!isVerified) {
      const error = new Error("Wrong OTP");
      error.statusCode = 401;
      return next(error);
    }

    res.status(200).json({ message: "OTP Verified" });
  } catch (error) {
    next(error);
  }
};

export const ForgetPassword = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      const error = new Error("All Fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("User not Registred");
      error.statusCode = 401;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    existingUser.password = hashedPassword;

    await existingUser.save();

    res.status(200).json({ message: "Password Reset Successfull" });
  } catch (error) {
    next(error);
  }
};