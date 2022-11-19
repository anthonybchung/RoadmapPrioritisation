const express = require("express");
const router = express.Router();
const {
  allInitiatives,
  updateInitiative,
  getInitiative,
} = require("../controllers/initiativesControllers");

const { protect } = require("../middleware/protect.middleware");

router.route("/").get(protect, allInitiatives);

router.route("/:id").get(protect, getInitiative).put(protect, updateInitiative);

module.exports = router;
