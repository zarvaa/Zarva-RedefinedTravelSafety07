import bcrypt from "bcrypt";
import User from "../models/User.js";
import { sendOTPEmail } from "../utils/email.js";

const otpStore = new Map(); // Temporary OTP store (replace with DB in production)

// Send OTP for Signup
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

// Final Signup after OTP verification
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

// Login (No changes)
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
