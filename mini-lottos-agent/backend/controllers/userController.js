const mongoose = require('mongoose');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { name, phone, district } = req.body;

    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this phone number already exists' });
    }

    const user = await User.create({
      name: name || 'Player',
      phone,
      district: district || '',
      agentId: req.agent.agentId
    });

    const phoneStr = phone.toString();
    const formattedId = phoneStr.length >= 7
      ? phoneStr.slice(0, 4) + '-' + phoneStr.slice(4, 7)
      : phoneStr;

    res.status(201).json({
      userId: formattedId,
      user: {
        _id: user._id,
        phone: user.phone,
        name: user.name,
        district: user.district,
        balance: user.balance,
        coins: user.coins,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const search = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    let user = null;

    if (mongoose.Types.ObjectId.isValid(q)) {
      user = await User.findById(q).select('-__v');
    }

    if (!user) {
      user = await User.findOne({ phone: q }).select('-__v');
    }

    res.json({ user: user || null });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { register, search };
