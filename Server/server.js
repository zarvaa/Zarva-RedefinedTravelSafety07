import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

import notifyRoutes from "./routes/notifyRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5174", // Your frontend's URL
    credentials: true, // Allow cookies to be sent
  })
);

app.use(express.json());

const uri = process.env.MONGODB_URI || "";
if (!uri) {
  console.error("⚠️ MongoDB URI not provided in .env");
  process.exit(1);
}
mongoose
  .connect(uri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB error:", err);
    process.exit(1);
  });

app.get("/", (_, res) => {
  res.send("🚀 Server is running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api", profileRoutes);

app.use("/api", notifyRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
