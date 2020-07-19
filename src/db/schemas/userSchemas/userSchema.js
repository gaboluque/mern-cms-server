import mongoose from 'mongoose';
import validator from 'validator';
import subscriptionSchema from './subscriptionSchema';
import { FREE_ROLE } from '../../../utils/userUtils/subscriptionUtils';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: 'El email del usuario es requerido',
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email invalido'],
    },
    password: {
      type: String,
      required: 'La contraseña del usuario es requerida',
      minlength: [7, 'La contraseña debe tener al menos 7 caracteres'],
      trim: true,
    },
    name: {
      type: String,
      required: 'El nombre del usuario es requerido',
      trim: true,
      minlength: [2, 'El nombre del usuario debe tener al menos 2 caracteres'],
      maxlength: [30, 'El nombre del usuario puede tener máximo 30 caracteres'],
    },
    lastName: {
      type: String,
      required: 'El apellido del usuario es requerido',
      trim: true,
      minlength: [
        2,
        'El apellido del usuario debe tener al menos 2 caracteres',
      ],
      maxlength: [
        30,
        'El apellido del usuario puede tener máximo 30 caracteres',
      ],
    },
    birthDate: {
      type: Date,
      required: 'La fecha de nacimiento del usuario es requerida',
    },
    country: {
      type: String,
      required: 'El país de residencia del usuario es requerido',
      trim: true,
      validate(country) {
        if (!validator.isISO31661Alpha2(country)) {
          throw new Error('El país es inválido');
        }
      },
    },
    city: {
      type: String,
      required: 'La ciudad de residencia del usuario es requerida',
      trim: true,
      minlength: [
        2,
        'La ciudad de residencia debe tener al menos 2 caracteres',
      ],
      maxlength: [
        30,
        'La ciudad de residencia puede tener máximo 30 caracteres',
      ],
    },
    admin: {
      type: Boolean,
      required: 'Se debe especificar si el usuario es administrador',
      default: false,
    },
    subscription: {
      type: subscriptionSchema,
      required: 'Se debe especificar la suscripción del usuario',
      default: {
        role: FREE_ROLE,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default userSchema;
