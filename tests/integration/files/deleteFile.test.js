import fs from 'fs';
import path from 'path';
import sessionCreator from '../../../src/business/services/authServices/sessionCreator';
import userCreator from '../../../src/business/services/authServices/userCreator';
import { dbClose, dbConnect, removeAllCollections, testApp } from '../../utils';
import { validAdminDTO } from '../../utils/userTestUtils';
import { getTestFile } from '../../utils/fileTestUtils';
import fileCreator from '../../../src/business/services/fileServices/fileCreator';
import { mongoId } from '../../../src/utils/commonUtils';
import articleCreator from '../../../src/business/services/articleServices/articleCreator';
import { validArticleDTO } from '../../utils/articleTestUtils';

const route = '/files';

describe(route, () => {
  let token;
  let file;

  beforeAll(async () => {
    await dbConnect();
  });

  beforeEach(async () => {
    await userCreator(validAdminDTO);
    const auth = await sessionCreator(validAdminDTO);
    token = auth.token;

    const testFile = getTestFile();
    file = await fileCreator({ file: testFile });
  });

  afterEach(async () => {
    await removeAllCollections();
  });

  afterAll(async (done) => {
    await dbClose();
    done();
  });

  it('should upload file', async () => {
    const res = await testApp
      .delete(`${route}/${file._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.info.message).toEqual('Archivo eliminado correctamente!');
    expect(res.body.info.type).toEqual('success');
  });

  it('should return error on no file', async () => {
    const res = await testApp
      .delete(`${route}/${mongoId()}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body.success).toEqual(false);
    expect(res.body.info.message).toEqual('Archivo no encontrado');
    expect(res.body.info.type).toEqual('error');
  });

  it('should return error on file in use', async () => {
    await articleCreator(validArticleDTO(file._id));
    const res = await testApp
      .delete(`${route}/${file._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toEqual(false);
    expect(res.body.info.message).toEqual('El archivo está en uso!');
    expect(res.body.info.type).toEqual('warning');
  });
});
