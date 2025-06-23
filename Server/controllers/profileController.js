import User from "../models/User.js";
import Driver from "../models/Driver.js";
import bcrypt from "bcrypt";

// Get User Profile
export const getUserProfile = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }, "-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update User Profile (Name, Phone, Password)
export const updateUserProfile = async (req, res) => {
  const { email, name, phone, password } = req.body;

  try {
    const updateData = { name, phone };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const user = await User.findOneAndUpdate(
      { email },
      updateData,
      { new: true, select: "-password" }
    );

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Driver Profile
export const getDriverProfile = async (req, res) => {
  const { email } = req.body;
  try {
    const driver = await Driver.findOne({ email }, "-password");
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.json(driver);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Driver Profile (Name, Phone, Vehicle Details, Password)
export const updateDriverProfile = async (req, res) => {
  const { email, fullName, mobile, vehicleModel, vehicleNumber, password } = req.body;

  try {
    const updateData = { fullName, mobile, vehicleModel, vehicleNumber };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const driver = await Driver.findOneAndUpdate(
      { email },
      updateData,
      { new: true, select: "-password" }
    );

    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.json(driver);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
