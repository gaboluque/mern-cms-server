import articleCreator from '../../../../../src/business/services/articleServices/articleCreator';
import articleDeleter from '../../../../../src/business/services/articleServices/articleDeleter';
import fileCreator from '../../../../../src/business/services/fileServices/fileCreator';
import { dbClose, dbConnect, removeAllCollections } from '../../../../utils';
import { validArticleDTO } from '../../../../utils/articleTestUtils';
import { getTestFile } from '../../../../utils/fileTestUtils';
import Article from '../../../../../src/db/models/articleModel';
import { mongoId } from '../../../../../src/utils/commonUtils';

describe('articleDeleter service', () => {
  let article;

  beforeAll(async () => {
    await dbConnect();
  });

  beforeEach(async () => {
    await removeAllCollections();
    const testFile = getTestFile();
    const file = await fileCreator({ file: testFile });
    const validDTO = validArticleDTO(file._id);
    article = await articleCreator(validDTO);
  });

  afterAll(async (done) => {
    await dbClose();
    done();
  });

  it('should return deleted article on correct delete', async () => {
    const deletedArticle = await articleDeleter({
      articleId: article._id,
    });
    expect(deletedArticle._id).toStrictEqual(article._id);
    const foundArticle = await Article.findById(article._id);
    expect(foundArticle).toBe(null);
  });

  it('should throw exception on article not found', async () => {
    await expect(
      articleDeleter({
        articleId: mongoId(),
      })
    ).rejects.toThrow('Artículo no encontrado');
  });
});
