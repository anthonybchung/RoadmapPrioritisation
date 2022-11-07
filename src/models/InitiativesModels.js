const mongoose = require('mongoose');

const InitiativesSchema = new mongoose.Schema({
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
      impact: {
        type: String,
        unique: false,
        required: [true, 'Please enter Impact'],
        maxlength: [10, "Owner max length is 10" ],
        trim: true,
      },
      confidence: {
        type: String,
        unique: false,
        required: [true, 'Please enter Confidence'],
        maxlength: [10, "Owner max length is 10" ],
        trim: true,
      },
      effort: {
        type: String,
        unique: false,
        required: [true, 'Please enter Effort'],
        maxlength: [10, "Owner max length is 10" ],
        trim: true,
      },
        ice_score: {
        type: Number,
        unique: false,
        required: [true, 'Please enter ICE_Score'],
        default: 0,
      },
        priority: {
        type: String,
        unique: false,
        required: [true, 'Please enter Priority'],
        maxlength: [2, "Priority max length is 2" ],
        default: 0,
      },
      target: {
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
      comment: {
        type: String,
        unique: false,
        required: false,
        maxlength: [200, "Comment max length is 200" ],
      },
});    

module.exports = mongoose.model('Initiatives', InitiativesSchema);    