import { body } from 'express-validator';
import { roleList } from '../../utils/userUtils/subscriptionUtils';

const validSubscription = ({ role }) => roleList.includes(role);

const commonOwnDataUpdateValidator = [
  body('email').optional().isEmail().withMessage('El email no es valido'),
  body('name')
    .optional()
    .isLength({ min: 2, max: 30 })
    .withMessage('El nombre debe tener entre 2 y 30 caracteres'),
  body('lastName')
    .optional()
    .isLength({ min: 2, max: 30 })
    .withMessage('El apellido debe tener entre 2 y 30 caracteres'),
  body('birthDate')
    .optional()
    .isISO8601()
    .withMessage('La fecha de nacimiento no es valida'),
  body('country')
    .optional()
    .isISO31661Alpha2()
    .withMessage('El pais no es valido'),
  body('city')
    .optional()
    .isLength({ min: 2, max: 30 })
    .withMessage('La ciudad debe tener entre 2 y 30 caracteres'),
];

const commonUserUpdateDataValidator = [
  body('subscription')
    .optional()
    .custom(validSubscription)
    .withMessage('La subscripción no es valida'),
];

export { commonOwnDataUpdateValidator, commonUserUpdateDataValidator };
