const User = require('../models/User.model');
const ErrorResponse = require('../utils/errorResponse');

// Description: Register User.
// route: GET /api/v1/auth/register
// access: public
exports.register = async (req, res, next) => {
  res.status(200).json({ success: true, msg: 'register user' });
};
