import SuperError from './SuperError';

class ForbiddenError extends SuperError {
  constructor() {
    super('No tienes los permisos para realizar esta acción!', 403, 'error');
  }
}

export default ForbiddenError;
