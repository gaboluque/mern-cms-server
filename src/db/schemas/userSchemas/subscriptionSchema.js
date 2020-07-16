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
    },
    expirationDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    _id: false,
  }
);

export default subscriptionSchema;
