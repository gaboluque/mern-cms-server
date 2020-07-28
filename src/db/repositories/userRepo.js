import BusinessValidationError from '../../complements/exceptions/BusinessValidationError';
import NotFoundError from '../../complements/exceptions/NotFoundError';
import User from '../models/userModel';

const findUser = async (filter, projection = {}, options = {}) => {
  const user = await User.findOne(filter, projection, options);
  if (!user) throw new BusinessValidationError('Usuario no encontrado');
  return user;
};

const updateUser = async (filter, update = {}, options = {}) => {
  const user = await User.findOneAndUpdate(filter, update, {
    new: true,
    useFindAndModify: false,
    ...options,
  });
  if (!user) throw new NotFoundError('Usuario no encontrado');
  return user;
};

export default {
  findUser,
  updateUser,
};
