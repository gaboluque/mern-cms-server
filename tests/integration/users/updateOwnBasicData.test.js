import moment from 'moment';
import sessionCreator from '../../../src/business/services/authServices/sessionCreator';
import userCreator from '../../../src/business/services/authServices/userCreator';
import { dbClose, dbConnect, removeAllCollections, testApp } from '../../utils';
import {
  validLogIn,
  validUpdateUser,
  validUserDTO,
} from '../../utils/userTestUtils';

const route = '/users/me/basic-data';

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
    expect(res.body.data.admin).toEqual(false);
    expect(res.body.data.subscription.role).toEqual('free');
    expect(res.body.data.email).toEqual(validUpdateUser.email);
    expect(res.body.data.name).toEqual(validUpdateUser.name);
    expect(res.body.data.lastName).toEqual(validUpdateUser.lastName);
    expect(res.body.data.birthDate).toEqual(
      moment
        .utc(validUpdateUser.birthDate, moment.ISO_8601)
        .format('DD/MM/YYYY')
    );
    expect(res.body.data.country).toEqual(validUpdateUser.country);
    expect(res.body.data.city).toEqual(validUpdateUser.city);
  });
});
