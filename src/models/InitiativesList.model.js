const mongoose = require('mongoose');

const InitiativesListSchema = new mongoose.Schema({
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
      Description: {
        type: String,
        unique: false,
        required: [true, 'Please enter description'],
        maxlength: [200, "Decription max length is 200" ],
        trim: true,
      },
      Submit_data: {
        type: date,
        unique: false,
        required: [true, 'Please enter sumbit date'],
        default: Date.now,
      },
      Owner: {
        type: String,
        unique: false,
        required: [true, 'Please enter owner name'],
        maxlength: [20, "Owner max length is 20" ],
        trim: true,
      },
      Impact: {
        type: String,
        unique: false,
        required: [true, 'Please enter Impact'],
        maxlength: [10, "Owner max length is 10" ],
        trim: true,
      },
      Confidence: {
        type: String,
        unique: false,
        required: [true, 'Please enter Confidence'],
        maxlength: [10, "Owner max length is 10" ],
        trim: true,
      },
      Effort: {
        type: String,
        unique: false,
        required: [true, 'Please enter Effort'],
        maxlength: [10, "Owner max length is 10" ],
        trim: true,
      },
      ICE_Score: {
        type: Number,
        unique: false,
        required: [true, 'Please enter ICE_Score'],
        default: 0,
      },
      Priority: {
        type: String,
        unique: false,
        required: [true, 'Please enter Priority'],
        maxlength: [2, "Priority max length is 2" ],
        default: 0,
      },
      Target: {
        type: String,
        unique: false,
        required: [true, 'Please enter Target'],
        maxlength: [20, "Target max length is 20" ],
        default: 0,
      },
      target_launch: {
        type: String,
        unique: false,
        required: [false, 'Please enter Target Launch date'],
        maxlength: [10, "Owner max length is 10" ],
        default: 0,
      },
      Comment: {
        type: String,
        unique: false,
        required: false,
        maxlength: [200, "Comment max length is 200" ],
      },
});    

module.exports = mongoose.model('InitiativesList', InitiativesListSchema);    