const Initiatives = require('../models/InitiativesModels');
const ErrorResponse = require('../utils/errorResponse');

// Description: Get all users on the system.
// route: GET /api/v1/initiativesList/
// access: private
exports.allInitiatives = async (req, res, next) => {
  try {
    const initiatives = await Initiatives.find();
    res.status(200).json({
      success: true,
      data: initiativesList,
    });
  } catch (error) {
    next(
      new ErrorResponse('Server can not find initiativesrequested resources', 404)
    );
  }
};

// Description: get one initiatives.
// route: Get /api/v1/initiatives/:id
// access: private
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

// Description: Create new user.
// route: POST /api/v1/initiative/
// access: public
// exports.createUser = async (req, res, next) => {
//   try {
//     const user = await User.create(req.body);

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//       });
//     }
//     res.status(200).json({
//       success: true,
//       data: user,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// Description: Update users
// route: PUT /api/v1/initiative/:id
// access: private
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
