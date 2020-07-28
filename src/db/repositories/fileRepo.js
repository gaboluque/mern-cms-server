import BusinessValidationError from '../../complements/exceptions/BusinessValidationError';
import File from '../models/fileModel';

const findFile = async (filter, projection = {}, options = {}) => {
  const file = await File.findOne(filter, projection, options);
  if (!file) throw new BusinessValidationError('Archivo no encontrado');
  return file;
};

export default {
  findFile,
};
