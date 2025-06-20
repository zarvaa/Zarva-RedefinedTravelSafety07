// models/Feedback.ts
import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('Feedback', FeedbackSchema);
