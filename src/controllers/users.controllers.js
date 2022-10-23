const User = require('../models/User.model');
// Description: Get all users on the system.
// route: GET /api/v1/users/
// access: private
exports.allUsers = async (req, res, next) => {
  try {
    const users = findby();
  } catch {}
};

// Description: get one user.
// route: Get /api/v1/users/:id
// access: private
exports.getUser = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      msg: `recevied user id: ${req.params.id}`,
    },
  });
};

// Description: Create new user.
// route: POST /api/v1/users/
// access: public
exports.createUser = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      msg: 'new user created',
    },
  });
};

// Description: Update users
// route: PUT /api/v1/users/:id
// access: private
exports.updateUser = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      msg: `user id: ${req.params.id} updated`,
    },
  });
};

// Description: Delete user
// route: DELETE /api/v1/users/:id
// access: private
exports.deleteUser = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      msg: `user id: ${req.params.id} is deleted`,
    },
  });
};
