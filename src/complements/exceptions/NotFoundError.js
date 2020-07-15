import SuperError from './SuperError';

class NotFoundError extends SuperError {
  constructor() {
    super('No se encontro la ruta que estas buscando!', 404, 'error');
  }
}

export default NotFoundError;
