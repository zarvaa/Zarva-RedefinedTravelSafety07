import bcrypt from "bcrypt";
import User from "../models/User.js";
import Driver from "../models/Driver.js";
import { sendOTPEmail } from "../utils/email.js";

const otpStore = new Map(); // Temporary OTP store (use DB in production)

// ✅ Send OTP for Signup
export const sendSignupOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(409).json({ message: "User already exists" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

  try {
    await sendOTPEmail(email, otp);
    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("OTP Email error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// ✅ Final Signup after OTP verification
export const addUser = async (req, res) => {
  const { name, email, password, phone, otp } = req.body;

  if (!name || !email || !password || !otp) {
    return res.status(400).json({ message: "All fields & OTP are required." });
  }

  const stored = otpStore.get(email);
  if (!stored) return res.status(400).json({ message: "OTP expired or not requested." });
  if (stored.otp !== otp) return res.status(400).json({ message: "Invalid OTP." });
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ message: "OTP expired." });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(409).json({ message: "User already exists." });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, phone });
    await newUser.save();

    otpStore.delete(email);

    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed" });
  }
};

// ✅ Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found." });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid password." });

  return res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
};

export const sendResetOTP = async (req, res) => {
  const { email, userType } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!userType) return res.status(400).json({ message: "User type is required" });

  try {
    const model = userType === "driver" ? Driver : User;
    const user = await model.findOne({ email });
    
    if (!user) return res.status(404).json({ message: "Account not found with this email" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(`reset_${email}`, { otp, expiresAt: Date.now() + 5 * 60 * 1000, userType });

    await sendOTPEmail(email, otp);
    res.json({ message: "Password reset OTP sent to email" });
  } catch (err) {
    console.error("Reset OTP error:", err);
    res.status(500).json({ message: "Failed to send reset OTP" });
  }
};


// ✅ Verify OTP and Reset Password
export const verifyOTPAndResetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "Email, OTP, and new password are required" });
  }

  const stored = otpStore.get(`reset_${email}`);
  if (!stored) return res.status(400).json({ message: "OTP expired or not requested" });
  if (stored.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(`reset_${email}`);
    return res.status(400).json({ message: "OTP expired" });
  }

  try {
    const model = stored.userType === "driver" ? Driver : User;
    const user = await model.findOne({ email });
    
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    otpStore.delete(`reset_${email}`);

    return res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Password reset error:", err);
    res.status(500).json({ message: "Failed to reset password" });
  }
};


// ✅ Reset Password Directly
export const resetPasswordDirect = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and new password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: "Password updated successfully." });
  } catch (err) {
    console.error("Password reset error:", err);
    res.status(500).json({ message: "Server error during password reset." });
  }
};