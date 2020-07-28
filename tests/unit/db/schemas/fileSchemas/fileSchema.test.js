import fileSchema from '../../../../../src/db/schemas/fileSchemas/fileSchema';

describe('file schema', () => {
  it('should implement url correctly', async () => {
    const {
      obj: { url },
    } = fileSchema;
    expect(url).toBeDefined();
    expect(url.type.name).toBe('String');
    expect(url.required).toBe('La url del archivo es requerida');
    expect(url.trim).toBe(true);
    expect(url.lowercase).toBe(true);
    expect(url.match).toBeDefined();
  });

  it('should implement name correctly', async () => {
    const {
      obj: { name },
    } = fileSchema;
    expect(name).toBeDefined();
    expect(name.type.name).toBe('String');
    expect(name.required).toBe('El nombre del archivo es requerido');
    expect(name.trim).toBe(true);
    expect(name.minlength).toStrictEqual([
      2,
      'El nombre del archivo debe tener al menos 2 caracteres',
    ]);
    expect(name.maxlength).toStrictEqual([
      45,
      'El nombre del archivo puede tener máximo 45 caracteres',
    ]);
  });

  it('should implement kind correctly', async () => {
    const {
      obj: { kind },
    } = fileSchema;
    expect(kind).toBeDefined();
    expect(kind.type).toBeDefined();
    expect(kind.required).toBe('El tipo de archivo es requerido');
  });
});
