import sessionCreator from '../../business/services/authServices/sessionCreator';
import userCreator from '../../business/services/authServices/userCreator';
import exceptionWrapper from '../../complements/helpers/exceptionWrapper';
import responseFormatter from '../../complements/helpers/templates/responseFormatter';

const signUp = exceptionWrapper(async ({ permittedParams }, res) => {
  await userCreator(permittedParams);
  res
    .status(200)
    .send(
      responseFormatter(
        null,
        'Registro correcto! Por favor inicia sesión para continuar'
      )
    );
});

const logIn = exceptionWrapper(async ({ permittedParams }, res) => {
  const session = await sessionCreator(permittedParams);
  res.status(200).send(responseFormatter(session, 'Bienvenid@!'));
});

// eslint-disable-next-line import/prefer-default-export
export { signUp, logIn };
