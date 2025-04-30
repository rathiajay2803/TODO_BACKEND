import { StatusCodes } from 'http-status-codes';
import BaseError from './base.error.js';

class InternalServerError extends BaseError {
  constructor(details) {
    super(
      'Internal Server Error',
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Something went wrong! Please try after some time',
      details
    );
  }
}

export default InternalServerError;
