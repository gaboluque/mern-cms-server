import express from 'express';
import {
  updateBasicData,
  updateUserData,
} from '../controllers/usersController';
import authentication from '../middlewares/authentication';
import authorization from '../middlewares/authorization';
import sanitization from '../middlewares/sanitization';
import {
  usersUpdateOwnDataSanitizer,
  usersUpdateDataSanitizer,
} from '../sanitizers/usersSanitizers';

const usersRouter = new express.Router();

// Me paths
const mePath = '/me';

usersRouter.put(
  `${mePath}/basic-data`,
  authentication,
  sanitization(usersUpdateOwnDataSanitizer),
  updateBasicData
);

// Users paths
usersRouter.put(
  `/:userId`,
  authorization('admin'),
  sanitization(usersUpdateDataSanitizer),
  updateUserData
);

export default usersRouter;
