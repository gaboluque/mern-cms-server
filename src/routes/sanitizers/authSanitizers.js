import {
  commonCredentialsValidator,
  commonSignUpValidator,
} from '../validators/authValidators';

const authUserSignUpSanitizer = [...commonSignUpValidator];
const authUserLogInSanitizer = [...commonCredentialsValidator];

// eslint-disable-next-line import/prefer-default-export
export { authUserSignUpSanitizer, authUserLogInSanitizer };
