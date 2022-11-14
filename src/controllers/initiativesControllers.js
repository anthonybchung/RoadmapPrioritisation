const {InitiativesModel, Lifecycle} = require("../models/InitiativesModels");
const ErrorResponse = require("../utils/errorResponse");

// Description: Get all users on the system.
// route: GET /api/v1/initiatives/
// access: private
exports.allInitiatives = async (req, res, next) => {
  try {
    
    const initiatives = await InitiativesModel.find({lifecycle: Lifecycle.Initiative }).exec();
    res.status(200).json({
      success: true,
      data: initiatives,
    });
  } catch (error) {
    next(
      new ErrorResponse(
        "Server can not find initiatives requested resources",
        404
      )
    );
  }
};

// Description: get one initiatives.
// route: Get /api/v1/initiatives/:id
exports.getInitiative = async (req, res, next) => {
  try {
    const initiative = await Initiatives.findById({lifecylce: Lifecycle.Initiative(req.params.id)}).exec();

    if (!initiative) {
      const message = `Can not find initiative id: ${req.params.id}`;
      return next(new ErrorResponse(message, 404));
    }

    res.status(200).json({
      success: true,
      data: initiative,
    });
  } catch (error) {
    next(error);
  }
};

// Description: Update initiative
// route: PUT /api/v1/initiative/:id
exports.updateInitiative = async (req, res, next) => {
  try {
    const initiative = await Initiative.findByIdAndUpdate(
      ({lifecylce: Lifecycle.Initiative
      (req.params.id,
      req.body)}).exec(),
      // {
      //   new: true,
      //   runValidators: true,
      // }
    );

    if (!initiative) {
      const message = "Initiative id not found";
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

// Methods for Estimation lifecycle

// All estimations
exports.allEstimations = async (req, res, next) => {
  try {
    
    const estimation = await InitiativesModel.find({lifecycle: Lifecycle.estimation }).exec();
    res.status(200).json({
      success: true,
      data: estimation,
    });
  } catch (error) {
    next(
      new ErrorResponse(
        "Server can not find estimation requested resources",
        404
      )
    );
  }
};

// Single estimation
exports.getEstmation = async (req, res, next) => {
  console.log(req.params)
  // try {
  //   const estimation = await Estimations.findById({lifecylce: Lifecycle.estimation(req.params.id)}).exec();

  //   if (!estimation) {
  //     const message = `Can not find estimation id: ${req.params.id}`;
  //     return next(new ErrorResponse(message, 404));
  //   }

  //   res.status(200).json({
  //     success: true,
  //     data: estimation,
  //   });
  // } catch (error) {
  //   next(error);
  // }
};

// Description: Update initiative
// route: PUT /api/v1/initiative/:id
exports.updateEstimation = async (req, res, next) => {
  try {
    const initiative = await Initiative.findByIdAndUpdate(
      ({lifecylce: Lifecycle.Estimation
      (req.params._id,
      req.body)}).exec(),
    );

    if (!initiative) {
      const message = "Initiative id not found";
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

// Description: Create initiative
// route: PUT /api/v1/initiative/:id
exports.createInitiative = async (req, res, next) => {
  try {
    const initiative = await Initiative.findByIdAndUpdate(
      ({lifecylce: Lifecycle.Initiative
      (req.params.id,
      req.body)}).exec(),
      // {
      //   new: true,
      //   runValidators: true,
      // }
    );

    if (!initiative) {
      const message = "Initiative id not found";
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

// Description: Create intiatives.
// route: POST /api/v1/initiatives/
// access: private
exports.createInitiative = async (req, res, next) => {
  // arrayOfCheckedBox = req.body.initiativesAdded
  // try {
  //   const initiative = await Initiative.create(req.body);

  //   if (!initiative) {
  //     return res.status(400).json({
  //       success: false,
  //     });
  //   }
  //   res.status(200).json({
  //     success: true,
  //     data: initiative,
  //   });
  // } catch (error) {
  //   next(error);
  // }
};