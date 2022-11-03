const InitiativesList = require('../models/InitiativesList.model');
import mongoose from 'mongoose';
import { InitiativesList } from '../models/InitiativesList.model';

const InitiativesList = mongoose.model('InitiativesList, InitiativesListSchema')


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

