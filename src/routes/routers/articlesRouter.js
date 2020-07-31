import express from 'express';
import {
  createArticle,
  deleteArticle,
  updateArticle,
} from '../controllers/articlesController';
import authorization from '../middlewares/authorization';
import sanitization from '../middlewares/sanitization';
import {
  createArticleSanitizer,
  deleteArticleSanitizer,
  updateArticleSanitizer,
} from '../sanitizers/articlesSanitizers';

const articlesRouter = new express.Router();

articlesRouter.post(
  '/',
  authorization('admin'),
  sanitization(createArticleSanitizer),
  createArticle
);

articlesRouter.put(
  '/:articleId',
  authorization('admin'),
  sanitization(updateArticleSanitizer),
  updateArticle
);

articlesRouter.delete(
  '/:articleId',
  authorization('admin'),
  sanitization(deleteArticleSanitizer),
  deleteArticle
);

export default articlesRouter;
