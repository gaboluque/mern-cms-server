import express from 'express';
import { updateBasicData } from '../controllers/usersController';
import authentication from '../middlewares/authentication';
import sanitization from '../middlewares/sanitization';
import { usersUpdateSanitizer } from '../sanitizers/usersSanitizers';

const usersRouter = new express.Router();
const authPath = '/users';

usersRouter.put(
  `${authPath}/basic-data`,
  authentication,
  sanitization(usersUpdateSanitizer),
  updateBasicData
);

export default usersRouter;
