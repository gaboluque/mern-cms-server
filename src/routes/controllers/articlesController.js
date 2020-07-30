import articleCreator from '../../business/services/articleServices/articleCreator';
import exceptionWrapper from '../../complements/helpers/exceptionWrapper';
import responseFormatter from '../../complements/helpers/templates/responseFormatter';
import articleUpdater from '../../business/services/articleServices/articleUpdater';

const createArticle = exceptionWrapper(async ({ permittedParams }, res) => {
  const article = await articleCreator(permittedParams);
  res
    .status(200)
    .send(responseFormatter(article, 'Articulo creado correctamente!'));
});

const updateArticle = exceptionWrapper(async ({ permittedParams }, res) => {
  const article = await articleUpdater(permittedParams);
  res
    .status(200)
    .send(responseFormatter(article, 'Articulo actualizado correctamente!'));
});

// eslint-disable-next-line import/prefer-default-export
export { createArticle, updateArticle };
