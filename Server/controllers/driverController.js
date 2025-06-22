import bcrypt from "bcrypt";
import Driver from "../models/Driver.js";

export const registerDriver = async (req, res) => {
  const { fullName, mobile, email, vehicleModel, vehicleNumber, password } =
    req.body;

  if (
    !fullName ||
    !mobile ||
    !email ||
    !vehicleModel ||
    !vehicleNumber ||
    !password
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingDriver = await Driver.findOne({ email });
    if (existingDriver) {
      return res.status(409).json({ message: "Driver already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newDriver = new Driver({
      fullName,
      mobile,
      email,
      vehicleModel,
      vehicleNumber,
      password: hashedPassword,
    });

    await newDriver.save();

    res.status(201).json({ message: "Driver registered successfully." });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
