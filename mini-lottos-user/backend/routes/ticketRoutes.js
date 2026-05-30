const express = require('express');
const router = express.Router();
const { getTickets, getTicket } = require('../controllers/ticketController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getTickets);
router.get('/:id', authMiddleware, getTicket);

module.exports = router;
