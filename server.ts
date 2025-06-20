//Ignore the warning about the async statement, it is used correctly in the context of the code.
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import User from './models/User.ts'; // ✅ Ensure User.ts compiles to .js (or use esm loader)
import Feedback from './models/Feedback.ts';
import Driver from './models/Driver.ts'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI || '';
if (!uri) {
  console.error('⚠️ MongoDB URI not provided in .env');
  process.exit(1);
}
mongoose.connect(uri)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB error:', err);
    process.exit(1);
  });

// 🌐 Routes
app.get('/', (_, res) => {
  res.send('🚀 Server is running');
});

// ➕ SIGNUP
app.post('/addUser', async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, phone });
    await newUser.save();

    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Signup failed' });
  }
});

// 🔐 LOGIN
app.post('/loginUser', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found.' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid password.' });

  return res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone
  });
});

app.post('/submitFeedback', async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ message: 'Email and message are required.' });
  }

  try {
    const newFeedback = new Feedback({ email, message });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback saved successfully' });
  } catch (error) {
    console.error('Feedback saving error:', error);
    res.status(500).json({ message: 'Server error saving feedback' });
  }
});

app.post('/registerDriver', async (req: Request, res: Response) => {
  const { fullName, mobile, email, vehicleModel, vehicleNumber, password } = req.body;

  if (!fullName || !mobile || !email || !vehicleModel || !vehicleNumber || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingDriver = await Driver.findOne({ email });
    if (existingDriver) {
      return res.status(409).json({ message: 'Driver already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newDriver = new Driver({
      fullName,
      mobile,
      email,
      vehicleModel,
      vehicleNumber,
      password: hashedPassword
    });

    await newDriver.save();

    res.status(201).json({ message: 'Driver registered successfully.' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
