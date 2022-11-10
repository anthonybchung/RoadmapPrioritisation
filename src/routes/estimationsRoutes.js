const express = require('express');
const router = express.Router();
const {
  allEstimations,
  createEstimation,
  updateEstimation,
  deleteEstimation,
  getEstimation,
} = require('../controllers/estimationController');

const { protect } = require('../middleware/protect.middleware');
router.route('/').get(allEstimations).post(createEstimation);

router
  .route('/:id')
  .get( getEstimation)
  .put(updateEstimation)
  .delete(deleteEstimation)
  .post(createEstimation)

module.exports = router;
