import express from "express";
import { registerDriver, loginDriver } from "../controllers/driverController.js";

const router = express.Router();

router.post("/registerDriver", registerDriver);
router.post("/loginDriver", loginDriver);

export default router;
