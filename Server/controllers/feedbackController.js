import Feedback from "../models/Feedback.js";

export const submitFeedback = async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ message: "Email and message are required." });
  }

  try {
    const newFeedback = new Feedback({ email, message });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback saved successfully" });
  } catch (error) {
    console.error("Feedback saving error:", error);
    res.status(500).json({ message: "Server error saving feedback" });
  }
};
