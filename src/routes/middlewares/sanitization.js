import { matchedData, validationResult } from 'express-validator';
import SanitizationError from '../../complements/exceptions/SanitizationError';

const sanitization = (sanitizer) => [
  sanitizer,
  (req, _res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new SanitizationError(errors);
    }

    req.permittedParams = matchedData(req);
    next();
  },
];

export default sanitization;
