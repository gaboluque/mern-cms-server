import moment from 'moment';
import jwt from 'jsonwebtoken';
import encryptionGenerator from '../../business/services/utilServices/encryptionGenerator';

function toJSON() {
  const user = this;
  const userObject = user.toObject();
  if (this.birthDate)
    userObject.birthDate = moment
      .utc(user.birthDate, moment.ISO_8601)
      .format('DD/MM/YYYY');
  delete userObject.password;
  return userObject;
}

function fullName() {
  const user = this;
  return `${user.name} ${user.lastName}`;
}

async function createJWT() {
  const user = this;
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '60 days',
  });
  return token;
}

async function preSave(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await encryptionGenerator(user.password);
  }

  next();
}

export { toJSON, preSave, fullName, createJWT };
