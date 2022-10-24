const User = require('../models/User.model');
const ErrorResponse = require('../utils/errorResponse');

// Description: Register User.
// route: POST /api/v1/auth/register
// access: public
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
