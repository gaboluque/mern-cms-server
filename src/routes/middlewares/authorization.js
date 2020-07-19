import authentication from './authentication';
import ForbiddenError from '../../complements/exceptions/ForbiddenError';

export default () => [
  authentication,
  (req, _res, next) => {
    if (!req.user.admin) {
      throw new ForbiddenError();
    }
    return next();
  },
];
