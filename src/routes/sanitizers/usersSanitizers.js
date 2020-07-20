import { paramIdValidator } from '../validators/commonValidators';
import {
  commonOwnDataUpdateValidator,
  commonUserUpdateDataValidator,
} from '../validators/usersValidators';

const usersUpdateOwnDataSanitizer = commonOwnDataUpdateValidator;
const usersUpdateDataSanitizer = [
  paramIdValidator('userId'),
  ...commonUserUpdateDataValidator,
];

export { usersUpdateOwnDataSanitizer, usersUpdateDataSanitizer };
