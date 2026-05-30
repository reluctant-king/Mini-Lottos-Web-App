const User = require('../models/User');

const playGame = async (req, res) => {
  try {
    const { gameId, coinsEarned } = req.body;
    if (!coinsEarned || coinsEarned < 1) {
      return res.status(400).json({ success: false, message: 'Invalid coins earned' });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { coins: coinsEarned } },
      { new: true }
    );

    res.json({ success: true, user });
  } catch (error) {
    console.error('Play game error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const redeemCoins = async (req, res) => {
  try {
    const { coins } = req.body;
    if (!coins || coins < 1) {
      return res.status(400).json({ success: false, message: 'Invalid coins amount' });
    }

    const user = await User.findById(req.user._id);
    if (user.coins < coins) {
      return res.status(400).json({ success: false, message: 'Insufficient coins' });
    }

    const balanceToAdd = coins;

    user.coins -= coins;
    user.balance += balanceToAdd;
    await user.save();

    res.json({ success: true, user });
  } catch (error) {
    console.error('Redeem coins error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { playGame, redeemCoins };
