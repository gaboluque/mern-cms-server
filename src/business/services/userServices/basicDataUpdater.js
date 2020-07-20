import userRepo from '../../../db/repositories/userRepo';

export default async (userDTO, userId) => {
  const user = await userRepo.updateUser({ _id: userId }, userDTO);
  return user.toJSON();
};
