import userRepo from '../../../db/repositories/userRepo';
import BusinessValidationError from '../../../complements/exceptions/BusinessValidationError';
import User from '../../../db/models/userModel';

const verifyBusinessRules = async (userDTO, userId) => {
  await userRepo.findUser({ _id: userId });
};

export default async (userDTO, userId) => {
  await verifyBusinessRules(userDTO, userId);
  const user = await User.findOneAndUpdate({ _id: userId }, userDTO);
  return user;
};
