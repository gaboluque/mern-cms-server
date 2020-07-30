import { createArticleValidator } from '../validators/articlesValidators';
import { paramIdValidator } from '../validators/commonValidators';

const createArticleSanitizer = [...createArticleValidator];

const updateArticleSanitizer = [
  paramIdValidator('articleId'),
  ...createArticleValidator,
];

// eslint-disable-next-line import/prefer-default-export
export { createArticleSanitizer, updateArticleSanitizer };
