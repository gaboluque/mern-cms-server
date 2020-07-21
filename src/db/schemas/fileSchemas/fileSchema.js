import mongoose from 'mongoose';
import { kindList } from '../../../utils/fileUtils/fileKindUtils';

const fileSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: 'La url del archivo es requerida',
      trim: true,
      lowercase: true,
      match: [
        /^(https:\/\/s3.us-west-2.amazonaws.com\/).*(\/files\/).+/,
        'La url del archivo es invalida',
      ],
    },
    name: {
      type: String,
      required: 'El nombre del archivo es requerido',
      trim: true,
      minlength: [2, 'El nombre del archivo debe tener al menos 2 caracteres'],
      maxlength: [30, 'El nombre del archivo puede tener máximo 30 caracteres'],
    },
    kind: {
      type: String,
      required: 'El tipo de archivo es requerido',
      enum: {
        values: kindList,
        message: 'El rol de la suscripción es invalido',
      },
    },
  },
  {
    timestamps: true,
    _id: true,
  }
);

export default fileSchema;
