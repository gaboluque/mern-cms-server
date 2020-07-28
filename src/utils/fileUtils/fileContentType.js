import FileType from 'file-type';

const fileTypeFromBuffer = async (buffer) => {
  const { ext, mime } = await FileType.fromBuffer(buffer);
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
