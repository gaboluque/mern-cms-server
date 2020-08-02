import express from 'express';
import { createFile, deleteFile } from '../controllers/filesController';
import authorization from '../middlewares/authorization';
import sanitization from '../middlewares/sanitization';
import {
  createFileSanitizer,
  deleteFileSanitizer,
} from '../sanitizers/filesSanitizers';

const filesRouter = new express.Router();

filesRouter.post(
  '/',
  authorization('admin'),
  sanitization(createFileSanitizer),
  createFile
);

filesRouter.delete(
  '/:fileId',
  authorization('admin'),
  sanitization(deleteFileSanitizer),
  deleteFile
);

export default filesRouter;
