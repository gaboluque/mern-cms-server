import moment from 'moment';
import encryptionGenerator from '../../business/services/utilServices/encryptionGenerator';

function toJSON() {
  const user = this;
  const userObject = user.toObject();
  userObject.birthDate = moment(user.birthDate).format('DD/MM/YYYY');
  delete userObject.password;
  return userObject;
}

function fullName() {
  const user = this;
  return `${user.name} ${user.lastName}`;
}

async function preSave(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await encryptionGenerator(user.password);
  }

  next();
}

export { toJSON, preSave, fullName };
