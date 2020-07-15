import { body } from 'express-validator';

const commonSignUpValidator = [
  body('name')
    .isLength({ min: 2, max: 30 })
    .withMessage('El nombre no es valido'),
  body('country').isISO31661Alpha2().withMessage('El pais no es valido'),
  body('percentage')
    .isDecimal({ decimal_digits: '1,2' })
    .withMessage('El porcentaje no es valido'),
];

export {
  // eslint-disable-next-line import/prefer-default-export
  commonSignUpValidator,
};
