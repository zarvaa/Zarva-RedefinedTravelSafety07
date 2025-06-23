import express from "express";
import { resetPasswordDirect } from "../controllers/authController.js";

const router = express.Router();

// Password reset route for both User and Driver
router.post("/reset-password-direct", resetPasswordDirect);

export default router;
