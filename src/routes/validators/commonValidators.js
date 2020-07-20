import { param } from 'express-validator';

const paramIdValidator = (name) =>
  param(name).isMongoId().withMessage('ID invalido');

// eslint-disable-next-line import/prefer-default-export
export { paramIdValidator };
