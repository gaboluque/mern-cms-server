import fs from 'fs';
import path from 'path';
import fileCreator from '../../../../../src/business/services/fileServices/fileCreator';
import { IMAGE_FILE } from '../../../../../src/utils/fileUtils/fileKindUtils';

describe('userUpdater service', () => {
  it('should return true on correct create', async () => {
    const testFile = fs.readFileSync(
      path.resolve(__dirname, '../../../../utils/resources/1.jpg')
    );
    const file = await fileCreator({ file: testFile });
    expect(file).toBeDefined();
    expect(file._id).toBeDefined();
    expect(file.url).toBeDefined();
    expect(file.name).toBeDefined();
    expect(file.kind).toBe(IMAGE_FILE);
  });
});
