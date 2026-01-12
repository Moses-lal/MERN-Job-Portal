import express from "express";
import { register,login,logout, ForgetPassword, VerifyOTP, SendOTP } from "../controller/authcontroller.js";



const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);



router.post("/fp/sendOTP", SendOTP);
router.post("/fp/verifyOTP",VerifyOTP)
router.post("/forgetPassword",ForgetPassword)








export default router;