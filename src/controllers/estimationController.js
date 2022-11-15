const {InitiativesModel, Lifecycle} = require("../models/InitiativesModels");
const ErrorResponse = require("../utils/errorResponse");
const { allInitiatives } = require("./initiativesControllers");

// All estimation
// route: GET /api/v1/estimation/
exports.allEstimations = async (req, res, next) => {
  try {
    
    const estimation = await InitiativesModel.find({lifecycle: "Estimation" }).exec();
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

// Description: get one estimation.
// route: Get /api/v1/estimation/:id
exports.getEstimation = async (req, res, next) => {
  console.log(req.params)
  try {
    const estimation = await Estimations.findById({lifecycle: "Estimation"(req.params.id)}).exec();

    if (!estimation) {
      const message = `Can not find estimation id: ${req.params.id}`;
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

// Description: Update estimation
// route: PUT /api/v1/estimation/:id
exports.updateEstimation = async (req, res, next) => {
  try {
    const estimation = await allInitiatives.findByIdAndUpdate(req.params._id,{lifecycle: "Estimation"},
      );

    if (!initiative) {
      const message = "Initiative id not found";
      return next(new ErrorResponse(message, 422));
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Description: Update estimation lifecycle to estimated
// route: PUT /api/v1/estimated/:id
exports.updateEstimated = async (req, res, next) => {
    try {
      const estimation = await allInitiatives.findByIdAndUpdate(req.params._id, {lifecycle: "Estimated"}.exec(),
      );
  
      if (!initiative) {
        const message = "Initiative id not found";
        return next(new ErrorResponse(message, 422));
      }
  
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

// Description: Create estimation
// route: PUT/api/v1/createEstimtion/:id
exports.createEstimation = async (req, res, next) => {
  try {
    console.log(req.body)
    const ids = req.body?.selectedData || []
    for(id of ids) {
      console.log({id})
      await InitiativesModel.findByIdAndUpdate(id,{lifecycle: Lifecycle.Estimation}).exec()
    }
    
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

