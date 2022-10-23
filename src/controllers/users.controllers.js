const User = require('../models/User.model');
const ErrorResponse = require('../utils/errorResponse');

// Description: Get all users on the system.
// route: GET /api/v1/users/
// access: private
exports.allUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(
      new ErrorResponse('Server can not find Users requested resources', 404)
    );
  }
};

// Description: get one user.
// route: Get /api/v1/users/:id
// access: private
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      const message = `Can not find User ID: ${req.params.id}`;
      return next(new ErrorResponse(message, 404));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      const message = `Invalid User ID: ${error.value}`;
      next(new ErrorResponse(message, 400));
    }
  }
};

// Description: Create new user.
// route: POST /api/v1/users/
// access: public
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    if (!user) {
      return res.status(400).json({
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error.code === 11000) {
      const message = `Duplicate data: ${Object.keys(error.keyValue)}`;

      return next(new ErrorResponse(message, 409));
    }
    next(error);
  }
};

// Description: Update users
// route: PUT /api/v1/users/:id
// access: private
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Description: Delete user
// route: DELETE /api/v1/users/:id
// access: private
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(400).json({
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
