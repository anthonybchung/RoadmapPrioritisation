const express = require("express");
const router = express.Router();
const {
  allEstimations,
  updateEstimation,
  getEstimation,
//   createEstimation,
} = require("../controllers/initiativesControllers");

const { protect } = require("../middleware/protect.middleware");

router.route("/").get(allEstimations);

router.route("/:id").get(getEstimation)
// .put(updateEstimation).post(createEstimation);


module.exports = router;
