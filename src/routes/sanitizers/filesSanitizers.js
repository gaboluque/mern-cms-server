import { createFileValidator } from '../validators/filesValidators';

const createFileSanitizer = [...createFileValidator];

// eslint-disable-next-line import/prefer-default-export
export { createFileSanitizer };
