import User from "../models/User.js";
import Driver from "../models/Driver.js";

// USER
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

export const updateUserProfile = async (req, res) => {
  const { email, name, phone } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { name, phone },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// DRIVER
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

export const updateDriverProfile = async (req, res) => {
  const { email, fullName, mobile, vehicleModel, vehicleNumber } = req.body;
  try {
    const driver = await Driver.findOneAndUpdate(
      { email },
      { fullName, mobile, vehicleModel, vehicleNumber },
      { new: true }
    );
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.json(driver);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
