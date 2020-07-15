import SuperError from './SuperError';

class BusinessValidationError extends SuperError {
  constructor(message) {
    super(message, 400, 'warning');
  }
}

export default BusinessValidationError;
