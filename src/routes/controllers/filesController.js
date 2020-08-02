import fileCreator from '../../business/services/fileServices/fileCreator';
import exceptionWrapper from '../../complements/helpers/exceptionWrapper';
import responseFormatter from '../../complements/helpers/templates/responseFormatter';
import fileDeleter from '../../business/services/fileServices/fileDeleter';

const createFile = exceptionWrapper(async ({ files }, res) => {
  const [file] = files.file;
  const newFile = await fileCreator(file);
  res
    .status(201)
    .send(responseFormatter(newFile, 'Archivo creado correctamente!'));
});

const deleteFile = exceptionWrapper(
  async ({ permittedParams: { fileId } }, res) => {
    const newFile = await fileDeleter(fileId);
    res
      .status(200)
      .send(responseFormatter(newFile, 'Archivo eliminado correctamente!'));
  }
);

export { createFile, deleteFile };
