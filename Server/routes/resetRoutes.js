import express from "express";
import { resetPasswordDirect, sendResetOTP, verifyOTPAndResetPassword } from "../controllers/authController.js";

const router = express.Router();

// Password reset routes
router.post("/reset-password-direct", resetPasswordDirect);
router.post("/send-reset-otp", sendResetOTP);
router.post("/verify-otp-reset", verifyOTPAndResetPassword);

export default router;
