const User = require("../models/UserModels");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
// Description: Register User.
// route: POST /api/v1/auth/register
// access: public
exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
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
    return next(new ErrorResponse("Please provide email or password", 400));
  }

  try {
    // // User validation
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid email or user", 401));
    }

    //check authorisation
    const isAllowedAccess = await user.allowedAccess(password);

    if (!isAllowedAccess) {
      return next(new ErrorResponse("Not authorised"), 401);
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
    const user = await User.findById(req.params.id);
    console.log(user);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Description: ChangePassword
// route: PUT /api/v1/auth/changepassword
// access: Private

exports.changePassword = async (req, res, next) => {
  const { currentPassword, newPassword, email } = req.body;

  try {
    // User validation
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid email or user", 401));
    }

    //check authorisation
    const isAllowedAccess = await user.allowedAccess(currentPassword);

    if (!isAllowedAccess) {
      return next(new ErrorResponse("Not authorised"), 401);
    }

    //update password
    user.password = newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Description: Forgot password.
// route: POST: /api/v1/auth/forgotpassword
// access: Public

exports.forgotPassword = async (req, res, next) => {
  try {
    const userLowerCase = req.body.email.toLowerCase();
    const user = await User.findOne({ email: userLowerCase });

    if (!user) {
      return next(new ErrorResponse("No such email", 404));
    }

    //Get reset-password-token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    //create a link for user to reset password.
    const resetLink = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `Click the following link to reset password: \n\n ${resetLink}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset email",
        message,
      });

      res
        .status(200)
        .json({ success: true, data: "Reset password email sent" });
    } catch (error) {
      //clear tokens and expiry time.
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return next(new ErrorResponse("Email can not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};

//Description: reset password
// Route: PUT /api/v1/auth/resetpassword/:resettoken
// Access: Private

exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid token", 400));
    }

    // set new password.
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendTokenResponse(user, 200, res);
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

  const approved = user.approved;
  const _id = user._id;
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token, approved, _id });
};
