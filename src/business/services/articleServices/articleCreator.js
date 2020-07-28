import fileRepo from '../../../db/repositories/fileRepo';
import Article from '../../../db/models/articleModel';

const verifyBusinessRules = async ({ file }) => {
  await fileRepo.findFile({ _id: file }, { _id: 1 });
};

export default async (articleDTO) => {
  await verifyBusinessRules(articleDTO);
  const article = new Article(articleDTO);
  await article.save();

  return article;
};
