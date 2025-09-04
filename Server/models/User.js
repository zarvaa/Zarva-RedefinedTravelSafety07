import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Password is required only for email/password users. For Google users, it can be omitted.
  password: { type: String, required: function () { return !this.googleId; } },
  phone: { type: String },
  googleId: { type: String, index: true }
});

const User = mongoose.model('User', userSchema);

export default User;
