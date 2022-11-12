const User = require("../models/UserModels");
const ErrorResponse = require("../utils/errorResponse");

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
      new ErrorResponse("Server can not find Users requested resources", 404)
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
    next(error);
  }
};

// Description: Create new user.
// route: POST /api/v1/users/
// access: private
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
    next(error);
  }
};

// Description: Update users
// route: PUT /api/v1/users/:id
// access: private
exports.updateUser = async (req, res, next) => {
  //can not change password in this route.
  if (req.body.password) {
    const message = "Not authorized to change password";
    return next(new ErrorResponse(message, 401));
  }

  try {
    console.log(req.body);
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      const message = "User id not found";
      return next(new ErrorResponse(message, 422));
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
