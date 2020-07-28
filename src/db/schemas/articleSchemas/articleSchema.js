import mongoose from 'mongoose';
import {
  categoryList,
  HEALING_CATEGORY,
  formatList,
  FORMAT_1,
} from '../../../utils/articleUtils/articleContextUtils';

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: 'El título del artículo es requerido',
      trim: true,
      lowercase: true,
      minlength: [2, 'El titulo del artículo debe tener al menos 2 caracteres'],
      maxlength: [
        30,
        'El titulo del artículo puede tener máximo 30 caracteres',
      ],
    },
    description: {
      type: String,
      required: 'La descripción del artículo es requerida',
      trim: true,
      lowercase: true,
      minlength: [
        2,
        'La descripción del artículo debe tener al menos 2 caracteres',
      ],
      maxlength: [
        300,
        'La descripción del artículo puede tener máximo 300 caracteres',
      ],
    },
    content: {
      type: String,
      required: 'El contenido del artículo es requerido',
    },
    file: {
      required: 'El archivo del artículo es requerido',
      type: mongoose.ObjectId,
      ref: 'File',
    },
    category: {
      type: String,
      required: 'La categoría del artículo es requerida',
      enum: {
        values: categoryList,
        message: 'La categoría del artículo es invalida',
      },
      default: HEALING_CATEGORY,
    },
    format: {
      type: String,
      required: 'El formato del artículo es requerido',
      enum: {
        values: formatList,
        message: 'El formato del artículo es invalido',
      },
      default: FORMAT_1,
    },
  },
  {
    timestamps: true,
    _id: true,
  }
);

export default articleSchema;
