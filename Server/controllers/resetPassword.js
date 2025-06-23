import bcrypt from "bcrypt";
import User from "../models/User.js";
import Driver from "../models/Driver.js";

// Direct Password Reset (No OTP) for User & Driver
export const resetPasswordDirect = async (req, res) => {
  const { email, newPassword, userType } = req.body;

  if (!email || !newPassword || !userType) {
    return res.status(400).json({ message: "Email, newPassword, and userType are required." });
  }

  try {
    const model = userType === "driver" ? Driver : User;

    const user = await model.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User/Driver not found." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password reset successful." });
  } catch (err) {
    console.error("Password reset error:", err);
    return res.status(500).json({ message: "Server error during password reset." });
  }
};
