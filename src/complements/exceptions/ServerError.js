import SuperError from './SuperError';
import logHandler from '../subscribers/logSubscriber';

class ServerError extends SuperError {
  constructor(error) {
    super('Error en el servidor, vuelve a intentar mas tarde', 500, 'error');
    logHandler.emit('error', error);
  }
}

export default ServerError;
