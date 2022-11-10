const express = require('express');
const router = express.Router();
const {
  allEstimations,
  createEstimations,
  updateEstimations,
  deleteEstimations,
  getEstimations,
} = require('../controllers/Estimations.controllers');

const { protect } = require('../middleware/protect.middleware');
router.route('/').get(protect, allEstimations).post(protect, createEstimations);

router
  .route('/:id')
  .get( getEstimations)
  .put(updateEstimations)
  .delete(deleteEstimations);

module.exports = router;
