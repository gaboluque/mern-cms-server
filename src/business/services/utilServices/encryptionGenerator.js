import bcrypt from 'bcryptjs';

const encryptionGenerator = async (value) => {
  const encrypted = await bcrypt.hash(value, 8);
  return encrypted;
};

export default encryptionGenerator;
