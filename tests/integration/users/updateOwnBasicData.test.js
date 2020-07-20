import sessionCreator from '../../../src/business/services/authServices/sessionCreator';
import userCreator from '../../../src/business/services/authServices/userCreator';
import { dbClose, dbConnect, removeAllCollections, testApp } from '../../utils';
import {
  validLogIn,
  validUpdateUser,
  validUserDTO,
} from '../../utils/userTestUtils';

const route = '/me/basic-data';

describe(route, () => {
  let token;

  beforeAll(async () => {
    await dbConnect();
  });

  beforeEach(async () => {
    await userCreator(validUserDTO);
    const auth = await sessionCreator(validLogIn);
    token = auth.token;
  });

  afterEach(async () => {
    await removeAllCollections();
  });

  afterAll(async (done) => {
    await dbClose();
    done();
  });

  it('should fail with no authentication token', async () => {
    const res = await testApp.put(route).send(validUpdateUser);
    expect(res.statusCode).toEqual(401);
    expect(res.body.success).toEqual(false);
    expect(res.body.info.message).toEqual('Debes autenticarte primero!');
    expect(res.body.info.type).toEqual('warning');
  });

  it('should update successfully given correct token', async () => {
    const res = await testApp
      .put(route)
      .set('Authorization', `Bearer ${token}`)
      .send(validUpdateUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.info.message).toEqual('Datos actualizados correctamente!');
    expect(res.body.info.type).toEqual('success');
  });
});
