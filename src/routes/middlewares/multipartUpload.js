import multer from 'multer';
import BusinessValidationError from '../../complements/exceptions/BusinessValidationError';
import SanitizationError from '../../complements/exceptions/SanitizationError';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const formatErrorMsg = (msg) => ({ errors: [{ msg }] });

const fileValidation = (
  { name, minCount, maxCount, required, size },
  files
) => {
  if (
    (!files || files.length < minCount || files.length > maxCount) &&
    required
  ) {
    throw new SanitizationError(
      formatErrorMsg(
        `El campo ${name} debe contener al menos ${minCount} archivo(s) 
        y maximo ${minCount} archivo(s)`
      )
    );
  }

  if (files) {
    files.forEach((file) => {
      if (file.size > size) {
        throw new SanitizationError(
          formatErrorMsg(
            `El campo ${name} solo acepta archivos con un tamaño inferor a ${size}bytes`
          )
        );
      }
    });
  }
};

const multipartUpload = (validations) => {
  const fields = validations.map(({ name, maxCount }) => ({ name, maxCount }));
  return [
    upload.fields(fields),
    (req, _res, next) => {
      if (!req.files)
        throw new BusinessValidationError('Error al cargar archivos!');
      validations.forEach((validation) => {
        fileValidation(validation, req.files[validation.name]);
      });
      next();
    },
    (req, _res, next) => {
      if (req.files && !Object.keys(req.files).length) delete req.files;
      next();
    },
  ];
};

export default multipartUpload;
