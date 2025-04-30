import { StatusCodes } from 'http-status-codes';
import BaseError from './base.error.js';

class BadGateway extends BaseError {
  constructor(serviceName, details) {
    super(
      'Bad Gateway',
      StatusCodes.BAD_GATEWAY,
      `${serviceName} send invalid response`,
      details
    );
  }
}

export default BadGateway;
