import articleSchema from '../../../../../src/db/schemas/articleSchemas/articleSchema';
import {
  categoryList,
  formatList,
  FORMAT_1,
  HEALING_CATEGORY,
} from '../../../../../src/utils/articleUtils/articleContextUtils';

describe('file schema', () => {
  it('should implement title correctly', async () => {
    const {
      obj: { title },
    } = articleSchema;
    expect(title).toBeDefined();
    expect(title.type.name).toBe('String');
    expect(title.required).toBe('El título del artículo es requerido');
    expect(title.trim).toBe(true);
    expect(title.minlength).toStrictEqual([
      2,
      'El titulo del artículo debe tener al menos 2 caracteres',
    ]);
    expect(title.maxlength).toStrictEqual([
      30,
      'El titulo del artículo puede tener máximo 30 caracteres',
    ]);
  });

  it('should implement description correctly', async () => {
    const {
      obj: { description },
    } = articleSchema;
    expect(description).toBeDefined();
    expect(description.type.name).toBe('String');
    expect(description.required).toBe(
      'La descripción del artículo es requerida'
    );
    expect(description.trim).toBe(true);
    expect(description.minlength).toStrictEqual([
      2,
      'La descripción del artículo debe tener al menos 2 caracteres',
    ]);
    expect(description.maxlength).toStrictEqual([
      300,
      'La descripción del artículo puede tener máximo 300 caracteres',
    ]);
  });

  it('should implement content correctly', async () => {
    const {
      obj: { content },
    } = articleSchema;
    expect(content).toBeDefined();
    expect(content.type.name).toBe('String');
    expect(content.required).toBe('El contenido del artículo es requerido');
  });

  it('should implement file correctly', async () => {
    const {
      obj: { file },
    } = articleSchema;
    expect(file).toBeDefined();
    expect(file.type.name).toBe('ObjectId');
    expect(file.ref).toBe('File');
  });

  it('should implement category correctly', async () => {
    const {
      obj: { category },
    } = articleSchema;
    expect(category).toBeDefined();
    expect(category.type.name).toBe('String');
    expect(category.enum).toBeDefined();
    expect(category.required).toBe('La categoría del artículo es requerida');
    expect(category.enum.values).toStrictEqual(categoryList);
    expect(category.enum.message).toBe('La categoría del artículo es invalida');
    expect(category.default).toBe(HEALING_CATEGORY);
  });

  it('should implement format correctly', async () => {
    const {
      obj: { format },
    } = articleSchema;
    expect(format).toBeDefined();
    expect(format.type.name).toBe('String');
    expect(format.enum).toBeDefined();
    expect(format.required).toBe('El formato del artículo es requerido');
    expect(format.enum.values).toStrictEqual(formatList);
    expect(format.enum.message).toBe('El formato del artículo es invalido');
    expect(format.default).toBe(FORMAT_1);
  });
});
