const express = require('express');
const router = express.Router();
const InitiativesList = require("../models/InitiativesListModels");
const {
    getinitiativesList,
    updateinitiastivesList,
  } = require('../controllers/initiativesListControllers');

router
    .get('/initiativesList')

module.exports = router;