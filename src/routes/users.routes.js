const express = require('express');
const router = express.Router();
const {
  allUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} = require('../controllers/users.controllers');

router.route('/').get(allUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
