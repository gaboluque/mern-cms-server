import { commonSignUpValidator } from '../validators/authValidators';

const authUserSignUpSanitizer = [...commonSignUpValidator];

// eslint-disable-next-line import/prefer-default-export
export { authUserSignUpSanitizer };
