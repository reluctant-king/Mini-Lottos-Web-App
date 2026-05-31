const jwt = require('jsonwebtoken');
const OTP = require('../models/OTP');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone || phone.length !== 10) {
      return res.status(400).json({ success: false, message: 'Valid 10-digit phone number required' });
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OTP.findOneAndUpdate(
      { phone },
      { phone, code, expiresAt },
      { upsert: true, new: true }
    );

    console.log(`\n📱 ═══════════════════════════════════════════`);
    console.log(`   OTP for ${phone}: ${code}`);
    console.log(`   Expires: ${expiresAt.toLocaleTimeString()}`);
    console.log(`═══════════════════════════════════════════════\n`);

    const isDevMode = process.env.NODE_ENV !== 'production' || process.env.SHOW_OTP === 'true';

    const response = {
      success: true,
      message: 'OTP sent successfully',
    };

    if (isDevMode) {
      response.debugOtp = code;
      response.debugMessage = `Demo OTP (visible in dev mode): ${code}`;
    }

    res.json(response);
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { phone, code } = req.body;
    if (!phone || !code) {
      return res.status(400).json({ success: false, message: 'Phone and code are required' });
    }

    const otpRecord = await OTP.findOne({ phone });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'OTP not found. Please request a new OTP.' });
    }

    if (new Date() > otpRecord.expiresAt) {
      await OTP.deleteOne({ phone });
      return res.status(400).json({ success: false, message: 'OTP expired. Please request a new OTP.' });
    }

    if (otpRecord.code !== code) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    await OTP.deleteOne({ phone });

    // Find existing user — do NOT overwrite saved profile data
    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({ phone, name: 'Player' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        phone: user.phone,
        name: user.name,
        email: user.email,
        district: user.district,
        state: user.state,
        dob: user.dob,
        gender: user.gender,
        balance: user.balance,
        coins: user.coins,
        agentId: user.agentId,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const allowed = ['name', 'email', 'district', 'state', 'dob', 'gender', 'avatar'];
    const updates = {};
    allowed.forEach(field => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { sendOtp, verifyOtp, getMe, updateProfile };
