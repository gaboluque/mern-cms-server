import jsonwebtoken from 'jsonwebtoken';
import UnauthorizedError from '../../complements/exceptions/UnauthorizedError';
import exceptionWrapper from '../../complements/helpers/exceptionWrapper';
import userRepo from '../../db/repositories/userRepo';

const fetchUser = async (_id) => {
  const user = await userRepo.findUser({ _id });
  user.fullName = user.fullName();
  if (!user) {
    throw Error;
  }
  return user;
};

const authentication = async (req, _res, next) => {
  try {
    const jwt = req.header('Authorization').replace('Bearer ', '');
    const { id } = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
    const user = await fetchUser(id);
    req.jwt = jwt;
    req.user = user;
    next();
  } catch (e) {
    throw new UnauthorizedError();
  }
};

export default exceptionWrapper(authentication);
