const mongoose = require('mongoose');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { name, phone, district } = req.body;

    if (!name || !phone || !district) {
      return res.status(400).json({ message: 'Name, phone, and district are required' });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this phone number already exists' });
    }

    const randomNum = Math.floor(1000000 + Math.random() * 9000000);
    const userIdCode = String(randomNum).slice(0, 4) + '-' + String(randomNum).slice(4);

    const user = await User.create({
      name,
      phone,
      district,
      state: 'Kerala',
      userIdCode,
      agentId: req.agent.agentId
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        _id: user._id,
        userIdCode: user.userIdCode,
        name: user.name,
        phone: user.phone,
        district: user.district
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
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

const listAgentUsers = async (req, res) => {
  try {
    const users = await User.find({ agentId: req.agent.agentId })
      .select('name phone district userIdCode createdAt balance')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, search, listAgentUsers };
