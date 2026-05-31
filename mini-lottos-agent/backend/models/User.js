const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, unique: true, required: true },
  name: { type: String, default: 'Player' },
  email: { type: String, default: '' },
  district: { type: String, default: 'Kochi' },
  state: { type: String, default: 'Kerala' },
  dob: { type: Date, default: null },
  gender: { type: String, default: '' },
  balance: { type: Number, default: 120.50 },
  coins: { type: Number, default: 18 },
  userIdCode: { type: String, default: '' },
  agentId: { type: String, default: '' },
  avatar: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
