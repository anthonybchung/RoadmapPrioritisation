const { register } = require('../controllers/auth.controller');
const express = require('express');

const router = express.Router();

router.post('/register', register);

module.exports = router;
