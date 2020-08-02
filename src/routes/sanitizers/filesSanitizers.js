import { createFileValidator } from '../validators/filesValidators';
import { paramIdValidator } from '../validators/commonValidators';

const createFileSanitizer = [...createFileValidator];
const deleteFileSanitizer = [paramIdValidator('fileId')];

// eslint-disable-next-line import/prefer-default-export
export { createFileSanitizer, deleteFileSanitizer };
