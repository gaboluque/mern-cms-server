import sessionCreator from '../../../src/business/services/authServices/sessionCreator';
import userCreator from '../../../src/business/services/authServices/userCreator';
import fileCreator from '../../../src/business/services/fileServices/fileCreator';
import { mongoId } from '../../../src/utils/commonUtils';
import { dbClose, dbConnect, removeAllCollections, testApp } from '../../utils';
import {
  invalidArticleDTO,
  validArticleDTO,
} from '../../utils/articleTestUtils';
import { getTestFile } from '../../utils/fileTestUtils';
import { validAdminDTO } from '../../utils/userTestUtils';

const route = '/articles';

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

  it('should create article', async () => {
    const res = await testApp
      .post(route)
      .set('Authorization', `Bearer ${token}`)
      .send(validArticleDTO(file._id));
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.info.message).toEqual('Articulo creado correctamente!');
    expect(res.body.info.type).toEqual('success');
  });

  it('should return error on invalid file', async () => {
    const res = await testApp
      .post(route)
      .set('Authorization', `Bearer ${token}`)
      .send(validArticleDTO(mongoId()));
    expect(res.statusCode).toEqual(404);
    expect(res.body.success).toEqual(false);
    expect(res.body.info.message).toEqual('Archivo no encontrado');
    expect(res.body.info.type).toEqual('error');
  });

  it('should fail on invalid input', async () => {
    const res = await testApp
      .post(route)
      .set('Authorization', `Bearer ${token}`)
      .send(invalidArticleDTO);
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toEqual(false);
    expect(res.body.info.message).toEqual(
      expect.stringContaining('El título debe tener entre 2 y 30 caracteres')
    );
    expect(res.body.info.message).toEqual(
      expect.stringContaining(
        'La descripción debe tener entre 2 y 300 caracteres'
      )
    );
    expect(res.body.info.message).toEqual(
      expect.stringContaining('El archivo es inválido')
    );
    expect(res.body.info.message).toEqual(
      expect.stringContaining('La categoría es inválida')
    );
    expect(res.body.info.message).toEqual(
      expect.stringContaining('El formato es inválido')
    );
    expect(res.body.info.type).toEqual('warning');
  });
});
