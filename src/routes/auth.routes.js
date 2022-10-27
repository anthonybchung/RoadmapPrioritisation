const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth.controller');
const { protect } = require('../middleware/protect.middleware');
const express = require('express');

const router = express.Router();

// public
router
  .post('/register', register)
  .post('/login', login)
  .post('/forgotpassword', forgotPassword)
  .put('/resetpassword/:resettoken', resetPassword);

// private
router.get('/me', protect, getMe);

module.exports = router;
