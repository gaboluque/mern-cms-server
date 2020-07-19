import request from 'supertest';
import app from '../../../src/app';
import { dbClose, dbConnect, removeAllCollections } from '../../utils';
import {
  invalidLogIn,
  validLogIn,
  validUserDTO,
} from '../../utils/userTestUtils';
import userCreator from '../../../src/business/services/authServices/userCreator';
import { FREE_ROLE } from '../../../src/utils/userUtils/subscriptionUtils';

const route = '/auth/log-in';

describe(route, () => {
  beforeAll(async () => {
    await dbConnect();
    await userCreator(validUserDTO);
  });

  afterEach(async () => {
    await removeAllCollections();
  });

  afterAll(async (done) => {
    await dbClose();
    done();
  });

  it('should sign up user with valid input', async () => {
    const res = await request(app).post(route).send(validLogIn);
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.info.message).toEqual('Bienvenid@!');
    expect(res.body.info.type).toEqual('success');
    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.env).toEqual(process.env.NODE_ENV);
    expect(res.body.data.subscription.role).toEqual(FREE_ROLE);
    expect(res.body.data.name).toEqual(validUserDTO.name);
    expect(res.body.data.lastName).toEqual(validUserDTO.lastName);
  });

  it('should fail on invalid input', async () => {
    const res = await request(app).post(route).send(invalidLogIn);
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toEqual(false);
    expect(res.body.info.message).toEqual(
      expect.stringContaining('El email no es valido')
    );
    expect(res.body.info.message).toEqual(
      expect.stringContaining('La contraseña debe tener al menos 7 caracteres')
    );
    expect(res.body.info.type).toEqual('warning');
  });

  it('should fail on invalid password', async () => {
    const res = await request(app)
      .post(route)
      .send({ ...validLogIn, password: '1234567890' });
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toEqual(false);
    expect(res.body.info.message).toEqual(
      expect.stringContaining('Credenciales incorrectas!')
    );
    expect(res.body.info.type).toEqual('warning');
  });
});
