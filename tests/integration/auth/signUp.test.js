import request from 'supertest';
import app from '../../../src/app';
import { dbClose, dbConnect, removeAllCollections } from '../../utils';
import { invalidUserDTO, validUserDTO } from '../../utils/userTestUtils';

const route = '/auth/sign-up';

describe(route, () => {
  beforeAll(async () => {
    await dbConnect();
  });

  afterEach(async () => {
    await removeAllCollections();
  });

  afterAll(async (done) => {
    await dbClose();
    done();
  });

  it('should sign up user with valid input', async () => {
    const res = await request(app).post(route).send(validUserDTO);
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.info.message).toEqual(
      'Registro correcto! Por favor inicia sesión para continuar'
    );
    expect(res.body.info.type).toEqual('success');
  });

  it('should fail on invalid input', async () => {
    const res = await request(app).post(route).send(invalidUserDTO);
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toEqual(false);
    expect(res.body.info.message).toEqual(
      expect.stringContaining('El email no es valido')
    );
    expect(res.body.info.message).toEqual(
      expect.stringContaining('La contraseña debe tener al menos 7 caracteres')
    );
    expect(res.body.info.message).toEqual(
      expect.stringContaining('El nombre debe tener entre 2 y 30 caracteres')
    );
    expect(res.body.info.message).toEqual(
      expect.stringContaining('El apellido debe tener entre 2 y 30 caracteres')
    );
    expect(res.body.info.message).toEqual(
      expect.stringContaining('La fecha de nacimiento no es valida')
    );
    expect(res.body.info.message).toEqual(
      expect.stringContaining('El pais no es valido')
    );
    expect(res.body.info.message).toEqual(
      expect.stringContaining('La ciudad debe tener entre 2 y 30 caracteres')
    );
    expect(res.body.info.type).toEqual('warning');
  });
});
