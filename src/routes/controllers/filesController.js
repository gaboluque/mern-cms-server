import fileCreator from '../../business/services/fileServices/fileCreator';
import exceptionWrapper from '../../complements/helpers/exceptionWrapper';
import responseFormatter from '../../complements/helpers/templates/responseFormatter';

const createFile = exceptionWrapper(async ({ files }, res) => {
  const [file] = files.file;
  const newFile = await fileCreator(file);
  res
    .status(200)
    .send(responseFormatter(newFile, 'Archivo creado correctamente!'));
});

// eslint-disable-next-line import/prefer-default-export
export { createFile };
