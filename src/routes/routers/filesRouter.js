import express from 'express';
import { createFile } from '../controllers/filesController';
import authorization from '../middlewares/authorization';
import sanitization from '../middlewares/sanitization';
import { createFileSanitizer } from '../sanitizers/filesSanitizers';

const filesRouter = new express.Router();

filesRouter.post(
  '/',
  authorization('admin'),
  sanitization(createFileSanitizer),
  createFile
);

export default filesRouter;
