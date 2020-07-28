import SuperError from './SuperError';

class NotFoundError extends SuperError {
  constructor(message = 'No se encontro la ruta que estas buscando!') {
    super(message, 404, 'error');
  }
}

export default NotFoundError;
