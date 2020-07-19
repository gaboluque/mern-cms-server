import { commonUpdateValidator } from '../validators/usersValidators';

const usersUpdateSanitizer = [...commonUpdateValidator];

// eslint-disable-next-line import/prefer-default-export
export { usersUpdateSanitizer };
