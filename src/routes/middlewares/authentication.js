import jsonwebtoken from 'jsonwebtoken';
import UnauthorizedError from '../../complements/exceptions/UnauthorizedError';
import exceptionWrapper from '../../complements/helpers/exceptionWrapper';
import userRepo from '../../db/repositories/userRepo';

const authentication = async (req, _res, next) => {
  try {
    const jwt = req.header('Authorization').replace('Bearer ', '');
    const { id } = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
    const user = await await userRepo.findUser({ _id: id });
    req.jwt = jwt;
    req.currentUser = user;
    next();
  } catch (e) {
    throw new UnauthorizedError();
  }
};

export default exceptionWrapper(authentication);
