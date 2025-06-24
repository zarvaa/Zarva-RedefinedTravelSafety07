import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,  // Optional: prevents duplicates
  },
}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);
