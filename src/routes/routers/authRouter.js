import express from 'express';
import sanitization from '../middlewares/sanitization';
import {
  authUserSignUpSanitizer,
  authUserLogInSanitizer,
} from '../sanitizers/authSanitizers';
import { signUp, logIn } from '../controllers/authController';

const authRouter = new express.Router();
const authPath = '/auth';

authRouter.post(
  `${authPath}/sign-up`,
  sanitization(authUserSignUpSanitizer),
  signUp
);

authRouter.post(
  `${authPath}/log-in`,
  sanitization(authUserLogInSanitizer),
  logIn
);

export default authRouter;
