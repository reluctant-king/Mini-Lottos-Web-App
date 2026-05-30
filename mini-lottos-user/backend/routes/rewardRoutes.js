const express = require('express');
const router = express.Router();
const { playGame, redeemCoins } = require('../controllers/rewardController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/play', authMiddleware, playGame);
router.post('/redeem', authMiddleware, redeemCoins);

module.exports = router;
