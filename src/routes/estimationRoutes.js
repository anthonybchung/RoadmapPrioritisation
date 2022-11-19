const express = require("express");
const router = express.Router();
const {
  allEstimations,
  updateEstimation,
  updateEstimated,
  getEstimation,
  createEstimation,
} = require("../controllers/estimationController");

const { protect } = require("../middleware/protect.middleware");

router.route("/").get(protect, allEstimations);

router.route("/:id").get(protect, getEstimation);
router.route("/updateEstimation/:id").put(protect, updateEstimation);
router.route("/updateEstimated/:id").put(protect, updateEstimated);
router.route("/createEstimation").put(protect, createEstimation);

module.exports = router;
