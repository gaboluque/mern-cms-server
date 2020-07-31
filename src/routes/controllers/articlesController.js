import articleCreator from '../../business/services/articleServices/articleCreator';
import articleDeleter from '../../business/services/articleServices/articleDeleter';
import articleUpdater from '../../business/services/articleServices/articleUpdater';
import exceptionWrapper from '../../complements/helpers/exceptionWrapper';
import responseFormatter from '../../complements/helpers/templates/responseFormatter';

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

const deleteArticle = exceptionWrapper(async ({ permittedParams }, res) => {
  const article = await articleDeleter(permittedParams);
  res
    .status(200)
    .send(responseFormatter(article, 'Articulo eliminado correctamente!'));
});

export { createArticle, updateArticle, deleteArticle };
