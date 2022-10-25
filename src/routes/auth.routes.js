const { register, login, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/protect.middleware');
const express = require('express');

const router = express.Router();

// public
router.post('/register', register).post('/login', login);

// private
router.get('/me', protect, getMe);

module.exports = router;
