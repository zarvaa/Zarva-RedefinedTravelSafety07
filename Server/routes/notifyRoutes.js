import express from "express";
import Notification from "../models/Notification.js";

const router = express.Router();

// Simple route to submit email to MongoDB
router.post("/notify", async (req, res) => {
  const { email } = req.body;

  // Basic validation
  if (!email || !email.endsWith("@gmail.com")) {
    return res.status(400).json({ message: "A valid Gmail address is required." });
  }

  try {
    // Check if email already exists
    const exists = await Notification.findOne({ email });
    if (exists) {
      return res.status(200).json({ message: "Already submitted." });
    }

    // Save new email
    const newEntry = new Notification({ email });
    await newEntry.save();

    res.status(201).json({ message: "Email submitted successfully!" });
  } catch (error) {
    console.error("Error saving email:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

export default router;
