const express = require('express');
const router = express.Router();
const { getWinners, markRead } = require('../controllers/alertController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/winners', authMiddleware, getWinners);
router.put('/winners/:id/read', authMiddleware, markRead);

module.exports = router;
