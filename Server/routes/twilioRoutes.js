import express from "express";
import {
  initiateTwilioCall,
  sendTwilioMessage,
} from "../controllers/twilioController.js";

const router = express.Router();

router.post("/twilio-call", initiateTwilioCall);
router.post("/twilio-message", sendTwilioMessage);

export default router;
