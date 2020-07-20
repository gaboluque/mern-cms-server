import moment from 'moment';
import sessionCreator from '../../../src/business/services/authServices/sessionCreator';
import userCreator from '../../../src/business/services/authServices/userCreator';
import { dbClose, dbConnect, removeAllCollections, testApp } from '../../utils';
import {
  validAdminDTO,
  validUpdateData,
  validUserDTO,
} from '../../utils/userTestUtils';

const route = '/users';

describe(route, () => {
  let token;
  let user;

  beforeAll(async () => {
    await dbConnect();
  });

  beforeEach(async () => {
    await userCreator(validAdminDTO);
    user = await userCreator(validUserDTO);
    const auth = await sessionCreator(validAdminDTO);
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
    const res = await testApp.put(`${route}/${user._id}`).send(validUpdateData);
    expect(res.statusCode).toEqual(401);
    expect(res.body.success).toEqual(false);
    expect(res.body.info.message).toEqual('Debes autenticarte primero!');
    expect(res.body.info.type).toEqual('warning');
  });

  it('should update successfully given correct token', async () => {
    const res = await testApp
      .put(`${route}/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(validUpdateData);
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.info.message).toEqual('Usuario actualizado correctamente!');
    expect(res.body.info.type).toEqual('success');
    expect(res.body.data.admin).toEqual(false);
    expect(res.body.data.subscription.role).toEqual('basic');
    expect(res.body.data.email).toEqual(validUserDTO.email);
    expect(res.body.data.name).toEqual(validUserDTO.name);
    expect(res.body.data.lastName).toEqual(validUserDTO.lastName);
    expect(res.body.data.birthDate).toEqual(
      moment.utc(validUserDTO.birthDate, moment.ISO_8601).format('DD/MM/YYYY')
    );
    expect(res.body.data.country).toEqual(validUserDTO.country);
    expect(res.body.data.city).toEqual(validUserDTO.city);
  });
});
