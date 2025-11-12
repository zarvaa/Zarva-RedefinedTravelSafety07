import Notification from "../models/Notification.js";

export const notify = async (req, res) => {
    const { email } = req.body;

    if (!email || !email.endsWith("@gmail.com")) {
        return res.status(400).json({ message: "A valid Gmail address is required." });
    }

    try {
        // Check if email already exists
        const exists = await Notification.findOne({ email });
        if (exists) {
            return res.status(200).json({
                message: "Already submitted.",
                alreadyNotified: true,   // ✅ Send this key!
            });
        }

        // Save new email
        const newEntry = new Notification({ email });
        await newEntry.save();

        return res.status(201).json({
            message: "Email submitted successfully!",
            alreadyNotified: false,   // ✅ Send this key!
        });

    } catch (error) {
        console.error("Error saving email:", error);
        return res.status(500).json({ message: "Server error. Please try again." });
    }
};
