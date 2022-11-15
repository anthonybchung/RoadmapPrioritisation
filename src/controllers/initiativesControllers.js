const { InitiativesModel, Lifecycle } = require("../models/InitiativesModels");
const ErrorResponse = require("../utils/errorResponse");

// Description: Get all users on the system.
// route: GET /api/v1/initiatives/
// access: private
exports.allInitiatives = async (req, res, next) => {
  try {
<<<<<<< HEAD
    const initiatives = await InitiativesModel.find({
      lifecycle: { $in: [null, Lifecycle.Initiative] },
    }).exec();
=======
    const initiatives = await InitiativesModel.find({lifecycle: {$in: [ null, Lifecycle.Initiative ]} }).exec();
>>>>>>> b3438c94e29ac00f2c6e9419018c40631f448914
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
<<<<<<< HEAD
    const initiative = await InitiativesModel.findById({
      lifecycle: "Initiative",
      _id: req.params.id,
    }).exec();
=======
    const initiative = await InitiativesModel.findById({lifecycle: "Initiative",_id:req.params.id}).exec();
>>>>>>> b3438c94e29ac00f2c6e9419018c40631f448914

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
    const initiative = await InitiativesModel.findByIdAndUpdate(
      { lifecycle: "Initiative"(req.params.id, req.body) }.exec()
      // {
      //   new: true,
      //   runValidators: true,
      // }
    );

    // if (!initiative) {
    //   const message = "Initiative id not found";
    //   return next(new ErrorResponse(message, 422));
    // }

    res.status(200).json({
      success: true,
      // data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Description update Initiative to Estimate.
// route: PUT /api/v1/initiatives/updatetoEstimate/
exports.updateToEstimate = async (req, res, next) => {
  const array = req.body.selectedData;
  console.log(array);
  try {
    const updateInitiative = await InitiativesModel.update(
      { _id: { $in: array } },
      {
        lifecycle: "Estimation",
      },
      { mulit: true }
    );

    res.status(200).json({ data: updateInitiative });
  } catch (error) {
    console.log(error);
  }
};
