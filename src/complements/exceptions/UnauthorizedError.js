import SuperError from './SuperError';

class UnauthorizedError extends SuperError {
  constructor() {
    super('Debes autenticarte primero!', 401, 'warning');
  }
}

export default UnauthorizedError;
