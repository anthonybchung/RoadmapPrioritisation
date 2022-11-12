const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/protect.middleware");
const express = require("express");

const router = express.Router();

router
  .post("/register", register)
  .post("/login", login)
  .post("/forgotpassword", forgotPassword)
  .put("/resetpassword/:resettoken", resetPassword);

// private
router.route("/me/:id").get(getMe);

module.exports = router;
