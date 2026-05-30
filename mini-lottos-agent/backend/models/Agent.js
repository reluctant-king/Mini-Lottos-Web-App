const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  agentId: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String },
  phone: { type: String },
  district: { type: String },
  photo: { type: String, default: 'https://i.pravatar.cc/150?img=47' },
  ticketsSoldToday: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Agent', agentSchema);
