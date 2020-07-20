import express from 'express';
import { updateBasicData } from '../controllers/usersController';
import authentication from '../middlewares/authentication';
import sanitization from '../middlewares/sanitization';
import { usersUpdateSanitizer } from '../sanitizers/usersSanitizers';

const usersRouter = new express.Router();

// Me paths
const mePath = '/me';
usersRouter.put(
  `${mePath}/basic-data`,
  authentication,
  sanitization(usersUpdateSanitizer),
  updateBasicData
);

export default usersRouter;
