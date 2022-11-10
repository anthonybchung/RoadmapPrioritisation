const mongoose = require('mongoose');

const EstimationsSchema = new mongoose.Schema({
      priority: {
        type: String,
        unique: false,
        required: [true, 'Please enter Priority'],
        maxlength: [2, "Priority max length is 2" ],
        default: 0,
      },
      ticket_id: {
        type: String,
        unique: true,
        required: [true, 'Please enter a ticket_id'],
        maxlength: [7, "Ticket_id max length is 7" ],
        trim: true,
      },
      initiative: {
        type: String,
        unique: false,
        required: [true, 'Please enter a initiative title'],
        maxlength: [30, "Title max length is 30" ],
        trim: true,
      },
      description: {
        type: String,
        unique: false,
        required: [true, 'Please enter description'],
        maxlength: [200, "Decription max length is 200" ],
        trim: true,
      },
      submit_data: {
        type: Date,
        unique: false,
        required: [true, 'Please enter sumbit date'],
        default: Date.now,
      },
      owner: {
        type: String,
        unique: false,
        required: [true, 'Please enter owner name'],
        maxlength: [20, "Owner max length is 20" ],
        trim: true,
      },
      squad_name: {
        type: String,
        unique: true,
        required: [true, 'Please enter a squad name'],
        maxlength: [20, "Squad_name max length is 20" ],
        trim: true,
      },
      goal: {
        type: String,
        unique: false,
        required: [true, 'Please enter goal details'],
        maxlength: [150, "Owner max length is 150" ],
        trim: trim,
      },
      purpose: {
        type: String,
        unique: false,
        required: [true, 'Please enter goal details'],
        maxlength: [200, "Owner max length is 200" ],
        trim: trim,
      },
      eng_est: {
        type: Number,
        unique: false,
        required: [true, 'Please enter Engineer estimation'],
        default: 0,
      },
      design_est: {
        type: Number,
        unique: false,
        required: [true, 'Please enter Design estimation'],
        default: 0,
      },
      pm_est: {
        type: Number,
        unique: false,
        required: [true, 'Please enter PM estimation'],
        default: 0,
      },
      comment: {
        type: String,
        unique: false,
        maxlength: [200, "Owner max length is 200" ],
        trim: trim,
      },
});    

module.exports = mongoose.model('Estimations', EstimationsSchema);    