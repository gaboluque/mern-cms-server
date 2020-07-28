import articleCreator from '../../../../../src/business/services/articleServices/articleCreator';
import fileCreator from '../../../../../src/business/services/fileServices/fileCreator';
import { dbClose, dbConnect, removeAllCollections } from '../../../../utils';
import { validArticleDTO } from '../../../../utils/articleTestUtils';
import { getTestFile } from '../../../../utils/fileTestUtils';

describe('userUpdater service', () => {
  let file;
  beforeAll(async () => {
    await dbConnect();
  });

  beforeEach(async () => {
    await removeAllCollections();
    const testFile = getTestFile();
    file = await fileCreator({ file: testFile });
  });

  afterAll(async (done) => {
    await dbClose();
    done();
  });

  it('should return article on correct create', async () => {
    const validDTO = validArticleDTO(file._id);
    const article = await articleCreator(validDTO);
    expect(article).toBeDefined();
    expect(article._id).toBeDefined();
    expect(article.title).toBe(validDTO.title);
    expect(article.description).toBe(validDTO.description);
    expect(article.content).toBe(validDTO.content);
    expect(article.file).toBe(validDTO.file);
    expect(article.category).toBe(validDTO.category);
    expect(article.format).toBe(validDTO.format);
  });
});
