const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketNumber: { type: String, unique: true, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userPhone: { type: String },
  agentId: { type: String },
  numbers: { type: [Number] },
  category: { type: String, enum: ['Mini Lottos', 'Mega Jackpot', 'Daily Draw', 'Quick Pick', 'Bumper'], default: 'Mini Lottos' },
  price: { type: Number, default: 0 },
  drawDate: { type: Date },
  status: { type: String, enum: ['active', 'won', 'lost', 'pending'], default: 'active' },
  prize: { type: Number, default: 0 },
  gameName: { type: String },
  contacted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', ticketSchema);
