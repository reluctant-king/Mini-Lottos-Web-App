const express = require('express');
const router = express.Router();
const { register, search } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authMiddleware, register);
router.get('/search', authMiddleware, search);

module.exports = router;
