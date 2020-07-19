import basicDataUpdater from '../../business/services/userServices/basicDataUpdater';
import exceptionWrapper from '../../complements/helpers/exceptionWrapper';
import responseFormatter from '../../complements/helpers/templates/responseFormatter';

const updateBasicData = exceptionWrapper(async ({ permittedParams }, res) => {
  const user = await basicDataUpdater(permittedParams);
  res
    .status(200)
    .send(responseFormatter(user, 'Datos actualizados correctamente!'));
});

// eslint-disable-next-line import/prefer-default-export
export { updateBasicData };
