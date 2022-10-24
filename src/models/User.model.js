const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Please enter a user name'],
    maxlength: [30, 'Name can not be longer than 30 character'],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please enter an email address'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter a valid email address',
    ],
  },
  approved: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be over 6 character long'],
    select: false,
  },
});

module.exports = mongoose.model('User', UserSchema);
