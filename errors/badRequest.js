import { StatusCodes } from 'http-status-codes';
import BaseError from './base.error.js';

class BadRequest extends BaseError {
  constructor(message, details = undefined) {
    super('Bad Request', StatusCodes.BAD_REQUEST, message, details);
  }
}

export default BadRequest;
