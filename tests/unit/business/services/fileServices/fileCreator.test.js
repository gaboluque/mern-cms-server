import fileCreator from '../../../../../src/business/services/fileServices/fileCreator';
import { IMAGE_FILE } from '../../../../../src/utils/fileUtils/fileKindUtils';
import { dbClose, dbConnect, removeAllCollections } from '../../../../utils';
import { getTestFile } from '../../../../utils/fileTestUtils';

describe('fileCreator service', () => {
  beforeAll(async () => {
    await dbConnect();
  });

  beforeEach(async () => {
    await removeAllCollections();
  });

  afterAll(async (done) => {
    await dbClose();
    done();
  });

  it('should return true on correct create', async () => {
    const testFile = getTestFile();
    const file = await fileCreator({ file: testFile });
    expect(file).toBeDefined();
    expect(file._id).toBeDefined();
    expect(file.url).toBeDefined();
    expect(file.name).toBeDefined();
    expect(file.kind).toBe(IMAGE_FILE);
  });
});
