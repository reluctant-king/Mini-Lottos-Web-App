const mongoose = require('mongoose');

const drawSchema = new mongoose.Schema({
  name: { type: String },
  drawDate: { type: Date },
  winningNumbers: { type: [Number] },
  jackpot: { type: Number },
  status: { type: String, default: 'upcoming' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Draw', drawSchema);
