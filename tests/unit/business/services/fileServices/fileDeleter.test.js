import fileCreator from '../../../../../src/business/services/fileServices/fileCreator';
import { IMAGE_FILE } from '../../../../../src/utils/fileUtils/fileKindUtils';
import { dbClose, dbConnect, removeAllCollections } from '../../../../utils';
import { getTestFile } from '../../../../utils/fileTestUtils';
import fileDeleter from '../../../../../src/business/services/fileServices/fileDeleter';
import File from '../../../../../src/db/models/fileModel';
import { validArticleDTO } from '../../../../utils/articleTestUtils';
import articleCreator from '../../../../../src/business/services/articleServices/articleCreator';

describe('fileCreator service', () => {
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

  it('should delete file correctly', async () => {
    const deletedFile = await fileDeleter(file._id);
    expect(deletedFile).toBeDefined();
    expect(deletedFile._id).toStrictEqual(file._id);
    expect(deletedFile.url).toBe(file.url);
    expect(deletedFile.name).toBe(file.name);
    expect(deletedFile.kind).toBe(file.kind);
    const foundFile = await File.findOne({ _id: file._id });
    expect(foundFile).toBe(null);
  });

  it('should throw exception on file in use', async () => {
    await articleCreator(validArticleDTO(file._id));
    await expect(fileDeleter(file._id)).rejects.toThrow(
      'El archivo está en uso!'
    );
  });
});
