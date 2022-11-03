const express = require('express');
const router = express.Router();
const InitiativesList = require("../model/InitiativesList");
const {
    getinitiativesList,
    updateinitiativesList,
  } = require('../controllers/initiativesList.controller');

router
    .get('/initiativesList')
    .put( updateinitiativesList )

module.exports = router;