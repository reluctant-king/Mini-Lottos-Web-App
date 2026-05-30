const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Agent = require('../models/Agent');

const login = async (req, res) => {
  try {
    const { agentId, password } = req.body;

    if (!agentId || !password) {
      return res.status(400).json({ message: 'Agent ID and password are required' });
    }

    const agent = await Agent.findOne({ agentId });
    if (!agent) {
      return res.status(401).json({ message: 'Invalid Agent ID or password' });
    }

    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Agent ID or password' });
    }

    const token = jwt.sign(
      { agentId: agent.agentId, name: agent.name, photo: agent.photo },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      agent: {
        agentId: agent.agentId,
        name: agent.name,
        phone: agent.phone,
        district: agent.district,
        photo: agent.photo,
        ticketsSoldToday: agent.ticketsSoldToday,
        totalSales: agent.totalSales
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const agent = await Agent.findOne({ agentId: req.agent.agentId }).select('-password');
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.json(agent);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { login, getMe };
