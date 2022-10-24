const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red);

  let error = { ...err };
  error.message = err.message;

  // CastError
  if (err.name === 'CastError') {
    const message = `Invalid Resourse(${err.path}): ${err.value}`;
    error = new ErrorResponse(message, 400);
  }

  // Validation Error
  console.log(err.message);
  if (err.name === 'ValidationError') {
    const errKey = Object.keys(error.errors)[0];
    const message = `${error.errors[errKey]}`;
    error = new ErrorResponse(message, 422);
  }

  //Data Duplication Error
  if (err.code === 11000) {
    const message = `Duplicate data: ${Object.keys(error.keyValue)}`;

    error = new ErrorResponse(message, 409);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
