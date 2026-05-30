const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, unique: true, required: true },
  name: { type: String, default: 'Player' },
  district: { type: String, default: '' },
  balance: { type: Number, default: 120.50 },
  coins: { type: Number, default: 18 },
  agentId: { type: String, default: '' },
  avatar: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
