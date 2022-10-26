const {
  register,
  login,
  getMe,
  forgotPassword,
} = require('../controllers/auth.controller');
const { protect } = require('../middleware/protect.middleware');
const express = require('express');

const router = express.Router();

// public
router
  .post('/register', register)
  .post('/login', login)
  .post('/forgotpassword', forgotPassword);

// private
router.get('/me', protect, getMe);

module.exports = router;
