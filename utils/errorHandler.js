import { StatusCodes } from 'http-status-codes';
import BaseError from '../errors/base.error.js';

function errorHandler(err, req, res, next) {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: {},
      error: err.details,
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Something went wrong. Please try later',
    data: {},
    error: err,
  });
}

export default errorHandler;
