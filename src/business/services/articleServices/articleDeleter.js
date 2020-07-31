import articleRepo from '../../../db/repositories/articleRepo';

export default async ({ articleId }) => {
  const article = await articleRepo.removeArticle(articleId);
  return article;
};
