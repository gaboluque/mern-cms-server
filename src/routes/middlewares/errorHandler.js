/* eslint-disable no-console */
import SuperError from '../../complements/exceptions/SuperError';

const errorResponse = (res, message, code = 400, type = 'error') =>
  res.status(code).json({
    success: false,
    code,
    info: { message, type },
  });

export default (err, _req, res, _next) => {
  if (err instanceof SuperError) {
    return errorResponse(res, err.message, err.code, err.type);
  }

  if (err.name === 'ValidationError') {
    const { errors } = err;
    return errorResponse(
      res,
      Object.keys(errors)
        .map((key) => errors[key])
        .join(', ')
    );
  }

  if (err.name === 'MongoError') {
    const msg =
      'Hubo un error con el esquema de la base de datos. Por favor contacta el equipo encargado!';
    return errorResponse(res, msg);
  }

  if (err.name === 'MulterError') {
    console.log(err);
    return errorResponse(
      res,
      `Subiste más archivos de los permitidos en el campo ${err.field}`
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log(err.message, err.stack);
  }
  return res.status(500).json({ message: err.message });
};
