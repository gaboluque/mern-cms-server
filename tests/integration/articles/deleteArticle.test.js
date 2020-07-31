import articleCreator from '../../../src/business/services/articleServices/articleCreator';
import sessionCreator from '../../../src/business/services/authServices/sessionCreator';
import userCreator from '../../../src/business/services/authServices/userCreator';
import fileCreator from '../../../src/business/services/fileServices/fileCreator';
import { dbClose, dbConnect, removeAllCollections, testApp } from '../../utils';
import { validArticleDTO } from '../../utils/articleTestUtils';
import { getTestFile } from '../../utils/fileTestUtils';
import { validAdminDTO } from '../../utils/userTestUtils';
import { mongoId } from '../../../src/utils/commonUtils';

const route = '/articles';

describe(route, () => {
  let token;
  let file;
  let article;

  beforeAll(async () => {
    await dbConnect();
  });

  beforeEach(async () => {
    await userCreator(validAdminDTO);
    const auth = await sessionCreator(validAdminDTO);
    token = auth.token;
    const testFile = getTestFile();
    file = await fileCreator({ file: testFile });
    article = await articleCreator(validArticleDTO(file._id));
  });

  afterEach(async () => {
    await removeAllCollections();
  });

  afterAll(async (done) => {
    await dbClose();
    done();
  });

  it('should delete article', async () => {
    const res = await testApp
      .delete(`${route}/${article._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.info.message).toEqual('Articulo eliminado correctamente!');
    expect(res.body.info.type).toEqual('success');
  });

  it('should return 404 on article not found', async () => {
    const res = await testApp
      .delete(`${route}/${mongoId()}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body.success).toEqual(false);
    expect(res.body.info.message).toEqual('Artículo no encontrado');
    expect(res.body.info.type).toEqual('error');
  });
});
