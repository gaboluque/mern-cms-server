import articleCreator from '../../../../../src/business/services/articleServices/articleCreator';
import articleUpdater from '../../../../../src/business/services/articleServices/articleUpdater';
import fileCreator from '../../../../../src/business/services/fileServices/fileCreator';
import {
  BLOG_CATEGORY,
  FORMAT_1,
} from '../../../../../src/utils/articleUtils/articleContextUtils';
import { dbClose, dbConnect, removeAllCollections } from '../../../../utils';
import { validArticleDTO } from '../../../../utils/articleTestUtils';
import { getTestFile } from '../../../../utils/fileTestUtils';
import { mongoId } from '../../../../../src/utils/commonUtils';

describe('userUpdater service', () => {
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

  it('should return new article on correct update', async () => {
    const validDTO = {
      ...validArticleDTO(article.file),
      title: 'New title',
      description: 'new description',
      content: 'new Content',
      category: BLOG_CATEGORY,
      format: FORMAT_1,
    };
    const updatedArticle = await articleUpdater({
      articleId: article._id,
      ...validDTO,
    });
    expect(updatedArticle.title).toBe(validDTO.title);
    expect(updatedArticle.description).toBe(validDTO.description);
    expect(updatedArticle.content).toBe(validDTO.content);
    expect(updatedArticle.category).toBe(validDTO.category);
    expect(updatedArticle.format).toBe(validDTO.format);
    expect(updatedArticle.file).toStrictEqual(validDTO.file);
  });

  it('should throw exception on article not found', async () => {
    const validDTO = validArticleDTO(article.file);
    await expect(
      articleUpdater({
        articleId: mongoId(),
        ...validDTO,
      })
    ).rejects.toThrow('Articulo no encontrado');
  });

  it('should throw exception on file not found', async () => {
    const validDTO = validArticleDTO(mongoId());
    await expect(
      articleUpdater({
        articleId: mongoId(),
        ...validDTO,
      })
    ).rejects.toThrow('Archivo no encontrado');
  });
});
