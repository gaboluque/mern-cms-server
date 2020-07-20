import bcrypt from 'bcryptjs';
import BusinessValidationError from '../../../complements/exceptions/BusinessValidationError';
import sessionTemplate from '../../../complements/helpers/templates/sessionTemplate';
import userRepo from '../../../db/repositories/userRepo';

const badAuthError = () => {
  throw new BusinessValidationError('Credenciales incorrectas!');
};

const verifyCredentials = async (user, password) => {
  const isMatch = user ? await bcrypt.compare(password, user.password) : null;
  if (!user || !isMatch) badAuthError();
};

export default async ({ email, password }) => {
  const user = await userRepo.findUser(
    { email },
    {
      _id: 1,
      name: 1,
      lastName: 1,
      password: 1,
      subscription: 1,
      admin: 1,
    }
  );

  await verifyCredentials(user, password);
  const token = await user.createJWT();

  return sessionTemplate(user.toJSON(), token);
};
