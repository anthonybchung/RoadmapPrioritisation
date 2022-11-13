const express = require("express");
const router = express.Router();
const {
  allUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/usersControllers");

const { protect } = require("../middleware/protect.middleware");
router.route("/").get(protect, allUsers).post(protect, createUser);

router
  .route("/:id")
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(deleteUser);

module.exports = router;
