import NotFoundError from '../../complements/exceptions/NotFoundError';
import Article from '../models/articleModel';

const updateArticle = async (filter, update = {}, options = {}) => {
  const article = await Article.findOneAndUpdate(filter, update, {
    ...options,
    new: true,
    useFindAndModify: false,
  });
  if (!article) throw new NotFoundError('Artículo no encontrado');
  return article;
};

export default {
  updateArticle,
};
