import multer from 'multer';
import sizeOf from 'image-size';
import SanitizationError from '../../complements/exceptions/SanitizationError';
import BusinessValidationError from '../../complements/exceptions/BusinessValidationError';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const formatErrorMsg = (msg) => ({ errors: [{ msg }] });

const imageValidation = (
  { mimetype, buffer },
  name,
  { width, height, exactDimensions }
) => {
  if (!['image/png', 'image/jpg', 'image/jpeg'].includes(mimetype)) {
    throw new SanitizationError(
      formatErrorMsg(`El campo ${name} solo acepta formatos png, jpg y jpeg`)
    );
  }
  const dimensions = sizeOf(buffer);
  if (
    exactDimensions &&
    (dimensions.height !== height || dimensions.width !== width)
  ) {
    throw new SanitizationError(
      formatErrorMsg(
        `Los archivos del campo ${name} deben ser de ${width}x${height} pixeles`
      )
    );
  } else if (
    !exactDimensions &&
    (dimensions.height > height || dimensions.width > width)
  ) {
    throw new SanitizationError(
      formatErrorMsg(
        `Los archivos del campo ${name} deben tener menos de ${width} pixeles de ancho y menos de ${height} pixeles alto`
      )
    );
  }
};

const fileValidation = (
  { name, kind, minCount, size, required, ...rest },
  files
) => {
  if ((!files || files.length < minCount) && required) {
    throw new SanitizationError(
      formatErrorMsg(
        `El campo ${name} debe contener al menos ${minCount} archivo(s)`
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
      if (kind === 'image') {
        imageValidation(file, name, rest);
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
