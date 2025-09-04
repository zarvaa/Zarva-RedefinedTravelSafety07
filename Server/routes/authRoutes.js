import express from "express";
import {
  sendSignupOTP,
  addUser,
  loginUser,
  sendResetOTP,
  verifyOTPAndResetPassword,
  resetPasswordDirect,
  googleLogin
} from "../controllers/authController.js";

const router = express.Router();

// 🔒 Signup & Login
router.post("/send-otp", sendSignupOTP);   // Send OTP for Signup
router.post("/signup", addUser);           // Final Signup
router.post("/login", loginUser);          // Login

// 🔒 Forgot Password with OTP
router.post("/reset/send-otp", sendResetOTP);                 // Send OTP for Password Reset
router.post("/reset/verify", verifyOTPAndResetPassword);      // Verify OTP & Reset Password

// 🔒 Optional: Direct Password Reset (without OTP) for testing
router.post("/reset/direct", resetPasswordDirect);

// 🔑 Google Login
router.post("/google", googleLogin);

export default router;
