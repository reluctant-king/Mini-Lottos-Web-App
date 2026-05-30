const express = require('express');
const router = express.Router();
const {
  createEntry, linkTicket, getTickets, getTicket, scanTicket, markContacted
} = require('../controllers/ticketController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, createEntry);
router.post('/link', authMiddleware, linkTicket);
router.get('/', authMiddleware, getTickets);
router.get('/scan', authMiddleware, scanTicket);
router.get('/:id', authMiddleware, getTicket);
router.post('/:id/contacted', authMiddleware, markContacted);

module.exports = router;
