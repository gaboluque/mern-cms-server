import FileType from 'file-type';
import BusinessValidationError from '../../complements/exceptions/BusinessValidationError';

const fileTypeFromBuffer = async (buffer) => {
  const data = await FileType.fromBuffer(buffer);
  if (!data) {
    throw new BusinessValidationError('Error al leer el archivo');
  }
  const { ext, mime } = data;
  const kind = mime.split('/')[0];
  return { ext, mime, kind };
};

const fileTypeFromFileObj = ({ mimetype }) => {
  const mime = mimetype;
  const ext = mime.split('/')[1];
  const kind = mime.split('/')[0];
  return { ext, mime, kind };
};

// eslint-disable-next-line import/prefer-default-export
export { fileTypeFromBuffer, fileTypeFromFileObj };
