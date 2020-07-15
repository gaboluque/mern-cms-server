import exceptionWrapper from '../../complements/helpers/exceptionWrapper';
import userRegistrator from '../../business/services/authServices/userRegistrator';

const signUp = exceptionWrapper(async ({ permittedParams }, res) => {
  const result = await userRegistrator(permittedParams);
  res.status(200).send(result);
});

// eslint-disable-next-line import/prefer-default-export
export { signUp };
