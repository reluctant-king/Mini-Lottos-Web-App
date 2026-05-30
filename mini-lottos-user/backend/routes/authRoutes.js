const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp, getMe, updateProfile } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.get('/me', authMiddleware, getMe);
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
