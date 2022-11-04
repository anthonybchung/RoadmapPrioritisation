const Initiatives = require('../models/InitiativesModels');
const ErrorResponse = require('../utils/errorResponse');

// Description: Get all users on the system.
// route: GET /api/v1/initiatives/
// access: private
exports.allInitiatives = async (req, res, next) => {
  try {
    const initiatives = await Initiatives.find();
    res.status(200).json({
      success: true,
      data: initiatives,
    });
  } catch (error) {
    next(
      new ErrorResponse('Server can not find initiatives requested resources', 404)
    );
  }
};

// Description: get one initiatives.
// route: Get /api/v1/initiatives/:id
exports.getInitiative = async (req, res, next) => {
  try {
    const initiative = await initiative.findById(req.params.id);

    if (!initiative) {
      const message = `Can not find User ID: ${req.params.id}`;
      return next(new ErrorResponse(message, 404));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Description: Update initiative
// route: PUT /api/v1/initiative/:id
exports.updateInitiative = async (req, res, next) => {
  try {
    const initiative = await Initiative.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!initiative) {
      const message = 'Initiative id not found';
      return next(new ErrorResponse(message, 422));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
