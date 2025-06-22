import express from "express";
import { submitFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/submitFeedback", submitFeedback);

export default router;
