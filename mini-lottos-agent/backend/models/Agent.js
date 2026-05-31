const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  agentId: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, default: 'Agent' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  district: { type: String, default: 'North Central District' },
  state: { type: String, default: 'Kerala' },
  photo: { type: String, default: '' },
  ticketsSoldToday: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Agent', agentSchema);
