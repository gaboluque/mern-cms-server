import fs from 'fs';
import path from 'path';
import sessionCreator from '../../../src/business/services/authServices/sessionCreator';
import userCreator from '../../../src/business/services/authServices/userCreator';
import { dbClose, dbConnect, removeAllCollections, testApp } from '../../utils';
import { validAdminDTO } from '../../utils/userTestUtils';

const route = '/files';

describe(route, () => {
  let token;
  beforeAll(async () => {
    await dbConnect();
  });

  beforeEach(async () => {
    await userCreator(validAdminDTO);
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

  it('should upload file', async () => {
    const testFile = fs.readFileSync(
      path.resolve(__dirname, '../../utils/resources/1.jpg')
    );
    const res = await testApp
      .post(route)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', `multipart/form-data`)
      .attach('file', testFile, { filename: '1.jpg' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.info.message).toEqual('Archivo creado correctamente!');
    expect(res.body.info.type).toEqual('success');
  });

  it('should throw error on no file', async () => {
    const res = await testApp
      .post(route)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toEqual(false);
    expect(res.body.info.message).toEqual('Error al cargar archivos!');
    expect(res.body.info.type).toEqual('warning');
  });
});
