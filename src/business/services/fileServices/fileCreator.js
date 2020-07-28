// import s3 from '../../../api/s3';

import s3 from '../../../api/s3';
import BusinessValidationError from '../../../complements/exceptions/BusinessValidationError';
import File from '../../../db/models/fileModel';
import { timeStamp } from '../../../utils/commonUtils';
import getFileData from '../../../utils/fileUtils/fileData';
import { fileExtToKind } from '../../../utils/fileUtils/fileKindUtils';

// TODO: Create temp file
const tempURL = 'https://aluz-development-files.s3.amazonaws.com/files/1.jpg';

const verifyBusinessRules = (ext) => {
  const kind = fileExtToKind(ext);
  if (!kind)
    throw new BusinessValidationError('El tipo de archivo no es válido!');
  return kind;
};

const updateFile = async (fileId, url) => {
  await File.findOneAndUpdate(
    { _id: fileId },
    { url },
    { useFindAndModify: false }
  );
};

const createFile = async (fileDTO) => {
  const file = new File(fileDTO);
  file.save();
  return file;
};

export default async (file) => {
  const { ext, mime, buffer } = await getFileData(file);

  const kind = verifyBusinessRules(ext);
  const key = `files/${kind}_${timeStamp()}.${ext}`;
  const newFile = await createFile({
    url: tempURL,
    kind,
    name: key,
  });

  s3.upload(
    {
      Bucket: process.env.AWS_BUCKET,
      ACL: 'public-read',
      Key: key,
      ContentType: mime,
      Body: buffer,
    },
    async (_err, { Location }) => {
      if (Location) {
        await updateFile(newFile._id, Location);
      }
    }
  );

  return newFile;
};
