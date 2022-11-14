const mongoose = require("mongoose");

const Lifecycle = {
  Submitted:"Submitted",
  Initiative:"Initiative",
  Estimation:"Estimation",
  Estimated:"Estimated",

}

const InitiativesSchema = new mongoose.Schema({
  ticket_id: {
    type: String,
    unique: true,
    required: [true, "Please enter a ticket_id"],
    maxlength: [7, "Ticket_id max length is 7"],
    trim: true,
  },
  initiative: {
    type: String,
    unique: false,
    required: [true, "Please enter a initiative title"],
    maxlength: [30, "Title max length is 30"],
    trim: true,
  },
  description: {
    type: String,
    unique: false,
    required: [true, "Please enter description"],
    maxlength: [200, "Decription max length is 200"],
    trim: true,
  },
  submit_data: {
    type: Date,
    unique: false,
    required: [true, "Please enter sumbit date"],
    default: Date.now,
  },
  owner: {
    type: String,
    unique: false,
    required: [true, "Please enter owner name"],
    maxlength: [20, "Owner max length is 20"],
    trim: true,
  },
  impact: {
    type: String,
    enum: {
      values: ["?", "Small", "Medium", "Large", "XLarge"],
      message: "Please valid enum value: xSmall,Small,Medium,Large,XLarge",
      default: "?",
    },
  },
  confidence: {
    type: String,
    enum: {
      values: ["?", "Small", "Medium", "Large", "XLarge"],
      message: "Please valid enum value: xSmall,Small,Medium,Large,XLarge",
    },
    default: "?",
  },
  effort: {
    type: String,
    enum: {
      values: ["?", "Small", "Medium", "Large", "XLarge"],
      message: "Please valid enum value: xSmall,Small,Medium,Large,XLarge",
    },
    default: "?",
  },
  ice_score: {
    type: Number,
    unique: false,
    required: [true, "Please enter ICE_Score"],
    default: 0,
  },
  priority: {
    type: String,
    enum: {
      values: ["?", "P-1", "P-2", "P-3", "P-4"],
      message: "Please valid enum value: ?,P-1,P-2,P-3,P-4",
    },
    default: "?",
  },
  target: {
    type: String,
    unique: false,
    required: [true, "Please enter Target"],
    maxlength: [20, "Target max length is 20"],
    default: 0,
  },
  target_launch: {
    type: String,
    enum: {
      values: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      message:
        "Please valid enum value: January,Febuary,March,April,May,June,July,August,September,October,November,December",
    },
    default: "January",
  },
estimationPriority: {
    type: String,
    enum: {
      values: ["?", "P-1", "P-2", "P-3", "P-4"],
      message: "Please valid enum value: ?,P-1,P-2,P-3,P-4",
    },
    default: "?",
  },
  comment: {
    type: String,
    unique: false,
    required: false,
    maxlength: [200, "Comment max length is 200"],
  },
  squad: {
    type: String,
    unique: false,
    required: true,
    maxlength: [100, "Comment max length is 100"],
  },
  eng_est: {
    type: Number,
    unique: false,
    required: true,
    default: 0,
  },
  design_est: {
    type: Number,
    unique: false,
    required: true,
    default: 0,
  },
  pm_est: {
    type: Number,
    unique: false,
    required: true,
    default: 0,
  },
  goals: {
    type: String,
    unique: false,
    required: false,
    maxlength: [200, "Comment max length is 200"],
  },
  purpose: {
    type: String,
    unique: false,
    required: false,
    maxlength: [200, "Comment max length is 200"],
  },
  
  // lifecycle: {
  //   type: String,
  //   enum: {
  //     values: Object.values(Lifecycle),
  //     message: `Please enter valid value: ${Object.values(Lifecycle)}`,
  //   },
  //   default: "Initiative",
  // },

  lifecycle: {
    type: String,
    enum: {
      values: ["Submitted", "Initiative", "Estimation", "Estimated"],
      message: "Please valid enum value: Submitted, Initiative, Estimation, Estimated"
    },
    default: "Submitted",
  },
  
});

module.exports = {
  InitiativesModel: mongoose.model("Initiatives", InitiativesSchema),
  Lifecycle,
}
