import express from 'express';
import { getUserProfile, updateUserProfile, getDriverProfile, updateDriverProfile } from '../controllers/profileController.js';
import { resetPasswordDirect } from '../controllers/authController.js';

const router = express.Router();

// USER Routes
router.post('/user/profile', getUserProfile);
router.put('/user/profile', updateUserProfile);

// DRIVER Routes
router.post('/driver/profile', getDriverProfile);
router.put('/driver/profile', updateDriverProfile);

export default router;
