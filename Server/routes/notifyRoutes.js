import express from "express";
import { notify } from "../controllers/notifyController.js";

const router = express.Router();

router.post("/notify", notify);

export default router;
