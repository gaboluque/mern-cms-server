import userSchema from '../../../../src/db/schemas/userSchemas/userSchema';
import { FREE_ROLE } from '../../../../src/utils/userUtils/subscriptionUtils';
import BusinessValidationError from '../../../../src/complements/exceptions/BusinessValidationError';

describe('user schema', () => {
  it('should implement email correctly', async () => {
    const {
      obj: { email },
    } = userSchema;
    expect(email).toBeDefined();
    expect(email.type.name).toBe('String');
    expect(email.required).toBe('El email del usuario es requerido');
    expect(email.trim).toBe(true);
    expect(email.lowercase).toBe(true);
    expect(email.match).toBeDefined();
  });

  it('should implement password correctly', async () => {
    const {
      obj: { password },
    } = userSchema;
    expect(password).toBeDefined();
    expect(password.type.name).toBe('String');
    expect(password.required).toBe('La contraseña del usuario es requerida');
    expect(password.trim).toBe(true);
    expect(password.minlength).toStrictEqual([
      7,
      'La contraseña debe tener al menos 7 caracteres',
    ]);
  });

  it('should implement name correctly', async () => {
    const {
      obj: { name },
    } = userSchema;
    expect(name).toBeDefined();
    expect(name.type.name).toBe('String');
    expect(name.required).toBe('El nombre del usuario es requerido');
    expect(name.trim).toBe(true);
    expect(name.minlength).toStrictEqual([
      2,
      'El nombre del usuario debe tener al menos 2 caracteres',
    ]);
    expect(name.maxlength).toStrictEqual([
      30,
      'El nombre del usuario puede tener máximo 30 caracteres',
    ]);
  });

  it('should implement lastName correctly', async () => {
    const {
      obj: { lastName },
    } = userSchema;
    expect(lastName).toBeDefined();
    expect(lastName.type.name).toBe('String');
    expect(lastName.required).toBe('El apellido del usuario es requerido');
    expect(lastName.trim).toBe(true);
    expect(lastName.minlength).toStrictEqual([
      2,
      'El apellido del usuario debe tener al menos 2 caracteres',
    ]);
    expect(lastName.maxlength).toStrictEqual([
      30,
      'El apellido del usuario puede tener máximo 30 caracteres',
    ]);
  });

  it('should implement birthDate correctly', async () => {
    const {
      obj: { birthDate },
    } = userSchema;
    expect(birthDate).toBeDefined();
    expect(birthDate.type.name).toBe('Date');
    expect(birthDate.required).toBe(
      'La fecha de nacimiento del usuario es requerida'
    );
  });

  it('should implement country correctly', async () => {
    const {
      obj: { country },
    } = userSchema;
    expect(country).toBeDefined();
    expect(country.type.name).toBe('String');
    expect(country.required).toBe(
      'El país de residencia del usuario es requerido'
    );
    expect(country.trim).toBe(true);
    expect(country.validate).toBeDefined();
    expect(country.validate('CO')).toBe(undefined);
  });

  it('should implement city correctly', async () => {
    const {
      obj: { city },
    } = userSchema;
    expect(city).toBeDefined();
    expect(city.type.name).toBe('String');
    expect(city.required).toBe(
      'La ciudad de residencia del usuario es requerida'
    );
  });

  it('should implement admin correctly', async () => {
    const {
      obj: { admin },
    } = userSchema;
    expect(admin).toBeDefined();
    expect(admin.type.name).toBe('Boolean');
    expect(admin.default).toBe(false);
    expect(admin.required).toBe(
      'Se debe especificar si el usuario es administrador'
    );
  });

  it('should implement subscription correctly', async () => {
    const {
      obj: { subscription },
    } = userSchema;
    expect(subscription).toBeDefined();
    expect(subscription.type).toBeDefined();
    expect(subscription.required).toBe(
      'Se debe especificar la suscripción del usuario'
    );
    expect(subscription.default).toStrictEqual({
      role: FREE_ROLE,
    });
  });

  it('should throw exception with invalid country', async () => {
    const {
      obj: { country },
    } = userSchema;
    expect(country.validate).toBeDefined();
    expect(() => {
      country.validate('QWER');
    }).toThrow('El país es inválido');
  });
});
