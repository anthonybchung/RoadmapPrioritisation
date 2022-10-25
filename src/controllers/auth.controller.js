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

    //generate a cookie- token on this user.
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// Description: Login User.
// route: POST /api/v1/auth/login
// access: public

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // // check if there is  email and password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide email or password', 400));
  }

  try {
    // // User validation
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorResponse('Invalid email or user', 401));
    }

    //check authorisation
    const isAllowedAccess = await user.allowedAccess(password);

    if (!isAllowedAccess) {
      return next(new ErrorResponse('Not authorised'), 401);
    }

    //create a token for user
    //generate a cookie- token on this user.
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// Description: Get current user
// route: GET /api/v1/auth/me
// access: Private

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// use cookie for token, and expry time
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const expiryPeriod = process.env.JWT_COOKIE_EXPIRE * 24 * 3600 * 1000;
  const options = {
    expires: new Date(Date.now() + expiryPeriod),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token });
};
