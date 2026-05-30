const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  phone: { type: String, unique: true },
  code: { type: String },
  expiresAt: { type: Date }
});

module.exports = mongoose.model('OTP', otpSchema);
