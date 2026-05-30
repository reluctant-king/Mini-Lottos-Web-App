const express = require('express');
const router = express.Router();
const { getUpcoming, getResults, getWinners } = require('../controllers/drawController');

router.get('/upcoming', getUpcoming);
router.get('/results', getResults);
router.get('/winners', getWinners);

module.exports = router;
