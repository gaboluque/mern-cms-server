import { body } from 'express-validator';
import {
  categoryList,
  formatList,
} from '../../utils/articleUtils/articleContextUtils';

const createArticleValidator = [
  body('title')
    .exists({ checkFalsy: true })
    .withMessage('El título del articulo es requerido')
    .bail()
    .isLength({ min: 2, max: 30 })
    .withMessage('El título debe tener entre 2 y 30 caracteres'),
  body('description')
    .exists({ checkFalsy: true })
    .withMessage('La descripción del articulo es requerido')
    .bail()
    .isLength({ min: 2, max: 300 })
    .withMessage('La descripción debe tener entre 2 y 300 caracteres'),
  body('content')
    .exists({ checkFalsy: true })
    .withMessage('El contenido del articulo es requerido'),
  body('file')
    .exists({ checkFalsy: true })
    .withMessage('El archivo del articulo es requerido')
    .bail()
    .isMongoId()
    .withMessage('El archivo es inválido'),
  body('category')
    .exists({ checkFalsy: true })
    .withMessage('La categoría del articulo es requerida')
    .bail()
    .isIn(categoryList)
    .withMessage('La categoría es inválida'),
  body('format')
    .exists({ checkFalsy: true })
    .withMessage('El formato del articulo es requerido')
    .bail()
    .isIn(formatList)
    .withMessage('El formato es inválido'),
];

// eslint-disable-next-line import/prefer-default-export
export { createArticleValidator };
