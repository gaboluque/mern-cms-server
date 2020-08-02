import NotFoundError from '../../complements/exceptions/NotFoundError';
import File from '../models/fileModel';

const findFile = async (filter, projection = {}, options = {}) => {
  const file = await File.findOne(filter, projection, options);
  if (!file) throw new NotFoundError('Archivo no encontrado');
  return file;
};

const deleteFile = async (id, options = {}) => {
  const file = await File.findByIdAndDelete(id, {
    ...options,
    useFindAndModify: false,
  });
  if (!file) throw new NotFoundError('Archivo no encontrado');
  return file;
};

export default {
  findFile,
  deleteFile,
};
