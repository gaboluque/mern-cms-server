import authentication from './authentication';
import ForbiddenError from '../../complements/exceptions/ForbiddenError';

export default (role) => [
  authentication,
  (req, _res, next) => {
    if (role === 'admin' && !req.currentUser.admin) {
      throw new ForbiddenError();
    }
    return next();
  },
];
