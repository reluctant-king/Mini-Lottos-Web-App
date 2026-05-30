const jwt = require('jsonwebtoken');
const OTP = require('../models/OTP');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OTP.findOneAndUpdate(
      { phone },
      { code, expiresAt },
      { upsert: true, new: true }
    );

    console.log(`\n📱 ═══════════════════════════════`);
    console.log(`   OTP for ${phone}: ${code}`);
    console.log(`═══════════════════════════════════\n`);

    res.json({ success: true, message: 'OTP sent successfully' });
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
        district: user.district,
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
    res.json({ success: true, user: req.user });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, district } = req.body;
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (district !== undefined) updateData.district = district;

    const user = await User.findByIdAndUpdate(req.user._id, updateData, { new: true });

    res.json({ success: true, user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { sendOtp, verifyOtp, getMe, updateProfile };
