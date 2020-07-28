import { fileTypeFromBuffer, fileTypeFromFileObj } from './fileContentType';

const getFileData = async (file) => {
  let mime;
  let ext;
  let buffer;
  if (file.fieldname) {
    const fileData = fileTypeFromFileObj(file);
    mime = fileData.mime;
    ext = fileData.ext;
    buffer = file.buffer;
  } else {
    const { file: fileBuffer } = file;
    const fileData = await fileTypeFromBuffer(fileBuffer);
    mime = fileData.mime;
    ext = fileData.ext;
    buffer = fileBuffer;
  }
  return {
    mime,
    ext,
    buffer,
  };
};

export default getFileData;
