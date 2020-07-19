import BusinessValidationError from '../../complements/exceptions/BusinessValidationError';
import User from '../models/userModel';

const findUser = async (filter, projection = {}, options = {}) => {
  const user = await User.findOne(filter, projection, options);
  if (!user) throw new BusinessValidationError('Usuario no encontrado');
  return user;
};

export default {
  findUser,
};
