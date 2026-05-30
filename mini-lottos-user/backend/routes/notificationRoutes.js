const express = require('express');
const router = express.Router();
const { getNotifications, clearAll, markRead } = require('../controllers/notificationController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getNotifications);
router.delete('/', authMiddleware, clearAll);
router.put('/:id/read', authMiddleware, markRead);

module.exports = router;
