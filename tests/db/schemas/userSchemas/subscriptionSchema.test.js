const {
  default: subscriptionSchema,
} = require('../../../../src/db/schemas/userSchemas/subscriptionSchema');
const {
  FREE_ROLE,
  roleList,
} = require('../../../../src/utils/userUtils/subscriptionUtils');

describe('subscription schema', () => {
  it('should implement role correctly', async () => {
    const {
      obj: { role },
    } = subscriptionSchema;
    expect(role).toBeDefined();
    expect(role.type.name).toBe('String');
    expect(role.enum).toBeDefined();
    expect(role.enum.values).toStrictEqual(roleList);
    expect(role.enum.message).toBe('El rol de la suscripción es invalido');
    expect(role.default).toBe(FREE_ROLE);
  });

  it('should implement paymentDate correctly', async () => {
    const {
      obj: { paymentDate },
    } = subscriptionSchema;
    expect(paymentDate).toBeDefined();
    expect(paymentDate.type.name).toBe('Date');
    expect(paymentDate.required).toBe(
      'La fecha de pago de la suscripción es requerida'
    );
  });

  it('should implement expirationDate correctly', async () => {
    const {
      obj: { expirationDate },
    } = subscriptionSchema;
    expect(expirationDate).toBeDefined();
    expect(expirationDate.type.name).toBe('Date');
    expect(expirationDate.required).toBe(
      'La fecha de expiración de la suscripción es requerida'
    );
  });
});
