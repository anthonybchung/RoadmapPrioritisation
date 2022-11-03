const express = require('express');
const router = express.Router();
const {
  allUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} = require('../controllers/users.controllers');

const { protect } = require('../middleware/protect.middleware');
router.route('/').get(protect, allUsers).post(protect, createUser);

router
  .route('/:id')
  .get( getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
