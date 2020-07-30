import fileRepo from '../../../db/repositories/fileRepo';
import articleRepo from '../../../db/repositories/articleRepo';

const verifyBusinessRules = async (articleId, articleDTO) => {
  await fileRepo.findFile({ _id: articleDTO.file }, { _id: 1 });
  const article = await articleRepo.updateArticle(
    { _id: articleId },
    articleDTO
  );
  return article;
};

export default async ({ articleId, ...articleDTO }) => {
  const article = await verifyBusinessRules(articleId, articleDTO);
  return article;
};
