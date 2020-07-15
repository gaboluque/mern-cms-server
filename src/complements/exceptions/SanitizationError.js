import SuperError from './SuperError';

const errorFormatter = (errors) => errors.map((x) => x.msg).join(', ');

class SanitizationError extends SuperError {
  constructor({ errors }) {
    super(errorFormatter(errors), 400, 'warning');
  }
}

export default SanitizationError;
