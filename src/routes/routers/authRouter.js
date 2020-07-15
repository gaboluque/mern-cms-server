import express from 'express';
import sanitization from '../middlewares/sanitization';
import { authUserSignUpSanitizer } from '../sanitizers/authSanitizers';
import { signUp } from '../controllers/authController';

const authRouter = new express.Router();
const authPath = 'auth';

authRouter.post(
  `${authPath}/users`,
  sanitization(authUserSignUpSanitizer),
  signUp
);

export default authRouter;
