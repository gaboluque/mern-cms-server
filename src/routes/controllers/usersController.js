import userUpdater from '../../business/services/userServices/userUpdater';
import exceptionWrapper from '../../complements/helpers/exceptionWrapper';
import responseFormatter from '../../complements/helpers/templates/responseFormatter';

const updateBasicData = exceptionWrapper(async (req, res) => {
  const user = await userUpdater(req.permittedParams, req.currentUser._id);
  res
    .status(200)
    .send(responseFormatter(user, 'Datos actualizados correctamente!'));
});

const updateUserData = exceptionWrapper(
  async ({ permittedParams: { userId, ...rest } }, res) => {
    const user = await userUpdater(rest, userId);
    res
      .status(200)
      .send(responseFormatter(user, 'Usuario actualizado correctamente!'));
  }
);

export { updateBasicData, updateUserData };
