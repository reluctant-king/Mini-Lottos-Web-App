const express = require('express');
const router = express.Router();
const { getDaily, getSales, getActivity } = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/daily', authMiddleware, getDaily);
router.get('/sales', authMiddleware, getSales);
router.get('/activity', authMiddleware, getActivity);

module.exports = router;
