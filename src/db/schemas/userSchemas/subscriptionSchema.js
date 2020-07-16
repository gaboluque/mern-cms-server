import mongoose from 'mongoose';
import {
  roleList,
  FREE_ROLE,
} from '../../../utils/userUtils/subscriptionUtils';

const subscriptionSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: {
        values: roleList,
        message: 'El rol de la suscripción es invalido',
      },
      default: FREE_ROLE,
    },
    paymentDate: {
      type: Date,
      required: 'La fecha de pago de la suscripción es requerida',
    },
    expirationDate: {
      type: Date,
      required: 'La fecha de expiración de la suscripción es requerida',
    },
  },
  {
    timestamps: true,
    _id: false,
  }
);

export default subscriptionSchema;
