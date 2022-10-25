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

    //generate a token on this user.
    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
    });
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

  // // User validation
  const user = await User.findOne({ email }).select('+password');

  //check authorisation
  const isAllowedAccess = await user.allowedAccess(password);

  if (!isAllowedAccess) {
    return next(new ErrorResponse('Not authorised'), 401);
  }

  //create a token for user
  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token,
  });
};
