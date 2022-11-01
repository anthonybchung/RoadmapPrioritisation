const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    unique: false,
    required: [true, 'Please enter a user name'],
    maxlength: [30, 'Name can not be longer than 30 character'],
    trim: true,
  },
  lastName: {
    type: String,
    unique: false,
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
  blocked: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, 'Please add password'],
    minlength: [6, 'Password must be over 6 character long'],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password pre-save(before saving)
// Using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign in JWT and return JWT
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

// Check if password matches
UserSchema.methods.allowedAccess = async function (enteredPassword) {
  const passwordMatch = await bcrypt.compare(enteredPassword, this.password);

  if (!this.approved || this.blocked || !passwordMatch) {
    return false;
  } else {
    return true;
  }
};

// create and hash password-token
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  //create and hash then insert into collections
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  //insert expiry into collections
  //expriry time in minutes.
  const expiryTime = 60;
  this.resetPasswordExpire = Date.now() + expiryTime * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
