import fs from 'fs';
import path from 'path';

const getTestFile = (fileName = '1.jpg') => {
  const testFile = fs.readFileSync(
    path.resolve(__dirname, `./resources/${fileName}`)
  );
  return testFile;
};

// eslint-disable-next-line import/prefer-default-export
export { getTestFile };
