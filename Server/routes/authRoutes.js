import express from "express";
import { sendSignupOTP, addUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", sendSignupOTP);
router.post("/signup", addUser);
router.post("/login", loginUser);

export default router;
