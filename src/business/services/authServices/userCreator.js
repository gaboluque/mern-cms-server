import BusinessValidationError from '../../../complements/exceptions/BusinessValidationError';
import User from '../../../db/models/userModel';

const verifyBusinessRules = async ({ email }) => {
  const foundUser = await User.findOne({ email }, { _id: 1 });
  if (foundUser) {
    throw new BusinessValidationError('Ya existe un usuario con éste email');
  }
};

export default async (userDTO) => {
  await verifyBusinessRules(userDTO);
  const user = new User(userDTO);
  await user.save();

  return user.toJSON();
};
