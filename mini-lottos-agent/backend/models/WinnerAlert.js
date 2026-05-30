const mongoose = require('mongoose');

const winnerAlertSchema = new mongoose.Schema({
  agentId: { type: String },
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  ticketNumber: { type: String },
  prize: { type: Number },
  winnerName: { type: String },
  winnerPhone: { type: String },
  contacted: { type: Boolean, default: false },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WinnerAlert', winnerAlertSchema);
