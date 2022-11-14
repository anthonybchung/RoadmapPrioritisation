const express = require("express");
const router = express.Router();
const {
  allEstimations,
  updateEstimation,
  updateEstimated,
  getEstimation,
  createEstimation
} = require ("../controllers/estimationController");


const { protect } = require("../middleware/protect.middleware");

router.route("/").get(allEstimations);

router.route("/:id").get(getEstimation)
router.route("/updateEstimation/:id").put(updateEstimation)
router.route("/updateEstimated/:id").put(updateEstimated)
router.route("/createEstimation").put(createEstimation)


module.exports = router;
