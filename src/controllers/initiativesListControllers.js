const InitiativesList = require('../models/InitiativesListModels');
const mongoose = require('mongoose');

// Commented out line 5 due to an error SyntaxError: Identifier 'InitiativesList' has already been declared
// const InitiativesList = mongoose.model('InitiativesList, InitiativesListSchema')


// Description: Get all initiativesList on the system.
// route: GET /api/v1/initiativesList/
exports.InitiativesList = async (req, res, next) => {
    try {
      const InitiativesList = await InitiativesList.find();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(
        new ErrorResponse('Server can not find InitiativesList requested resources', 404)
      );
    }
  };

