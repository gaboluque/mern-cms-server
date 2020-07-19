import { body } from 'express-validator';

const commonCredentialsValidator = [
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('El email es requerido')
    .bail()
    .isEmail()
    .withMessage('El email no es valido'),
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('La contraseña es requerida')
    .bail()
    .isLength({ min: 7 })
    .withMessage('La contraseña debe tener al menos 7 caracteres'),
];

const commonSignUpValidator = [
  ...commonCredentialsValidator,
  body('name')
    .exists({ checkFalsy: true })
    .withMessage('El nombre es requerido')
    .bail()
    .isLength({ min: 2, max: 30 })
    .withMessage('El nombre debe tener entre 2 y 30 caracteres'),
  body('lastName')
    .exists({ checkFalsy: true })
    .withMessage('El apellido es requerido')
    .bail()
    .isLength({ min: 2, max: 30 })
    .withMessage('El apellido debe tener entre 2 y 30 caracteres'),
  body('birthDate')
    .exists({ checkFalsy: true })
    .withMessage('La fecha de nacimiento es requerida')
    .bail()
    .isISO8601()
    .withMessage('La fecha de nacimiento no es valida'),
  body('country')
    .exists({ checkFalsy: true })
    .withMessage('El país es requerido')
    .bail()
    .isISO31661Alpha2()
    .withMessage('El pais no es valido'),
  body('city')
    .exists({ checkFalsy: true })
    .withMessage('La ciudad es requerida')
    .bail()
    .isLength({ min: 2, max: 30 })
    .withMessage('La ciudad debe tener entre 2 y 30 caracteres'),
];

export { commonSignUpValidator, commonCredentialsValidator };
