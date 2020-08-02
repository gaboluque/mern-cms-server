// import s3 from '../../../api/s3';

import fileRepo from '../../../db/repositories/fileRepo';
import articleRepo from '../../../db/repositories/articleRepo';
import BusinessValidationError from '../../../complements/exceptions/BusinessValidationError';
import { mongoId } from '../../../utils/commonUtils';
import Article from '../../../db/models/articleModel';

const verifyBusinessRules = async (fileId) => {
  const article = await Article.findOne({ file: mongoId(fileId) }, { _id: 1 });
  if (article) throw new BusinessValidationError('El archivo está en uso!');
};

export default async (fileId) => {
  await verifyBusinessRules(fileId);
  const file = await fileRepo.deleteFile(fileId);

  return file;
};
