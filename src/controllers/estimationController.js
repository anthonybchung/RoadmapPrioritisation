const Initiatives = require('../models/EstimationModels');
const ErrorResponse = require('../utils/errorResponse');

// Description: Get all estimations on the system.
// route: GET /api/v1/estimations/
// access: private
exports.allEstimations = async (req, res, next) => {
  try {
    const estimations = await Estimation.find();
    res.status(200).json({
      success: true,
      data: estimations,
    });
  } catch (error) {
    next(
      new ErrorResponse('Server can not find Estimation requested resources', 404)
    );
  }
};

// Description: get one estimation.
// route: Get /api/v1/estimations/:id
// access: private
exports.getEstimation= async (req, res, next) => {
  try {
    const estimation = await Estimation.findById(req.params.id);

    if (!estimation) {
      const message = `Can not find Estimation ID: ${req.params.id}`;
      return next(new ErrorResponse(message, 404));
    }

    res.status(200).json({
      success: true,
      data: estimation,
    });
  } catch (error) {
    next(error);
  }
};

// Description: Create new estimation.
// route: POST /api/v1/estimations/
// access: public
exports.createEstimation = async (req, res, next) => {
  try {
    const estimation = await Estimation.create(req.body);

    if (!estimation) {
      return res.status(400).json({
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      data: estimation,
    });
  } catch (error) {
    next(error);
  }
};

// Description: Update estimations
// route: PUT /api/v1/estimations/:id
// access: private
exports.updateEstimation = async (req, res, next) => {
  try {
    const estimation = await Estimation.findByIdAndEstimation(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!estimation) {
      const message = 'Estimation id not found';
      return next(new ErrorResponse(message, 422));
    }

    res.status(200).json({
      success: true,
      data: estimation,
    });
  } catch (error) {
    next(error);
  }
};

// Description: Delete estimation
// route: DELETE /api/v1/estimations/:id
// access: private
exports.deleteEstimation = async (req, res, next) => {
  try {
    const estimation = await Estimation.findByIdAndDelete(req.params.id);

    if (!estimation) {
      return res.status(400).json({
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
