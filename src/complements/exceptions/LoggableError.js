import SuperError from './SuperError';
import logHandler from '../subscribers/logSubscriber';

class LoggableError extends SuperError {
  constructor(message, error, place, data) {
    super(message);
    logHandler.emit(
      'error',
      `${error} \n ${place} \n DATA: \n${JSON.stringify(data)}`
    );
  }
}

export default LoggableError;
