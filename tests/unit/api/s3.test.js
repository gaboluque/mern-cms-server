import fs from 'fs';
import path from 'path';
import s3 from '../../../src/api/s3';
import { timeStamp } from '../../utils/commonTestUtils';

const testJson = {
  testData: {
    string: 'String',
    number: 0,
    array: [0, 'Data'],
  },
};

describe('s3 api', () => {
  const jsonKey = `test/json_${timeStamp()}`;

  it('should reject on file getObject', async () => {
    const video = await s3.getObject('test/mp4_sample.mp4');
    expect(video).toBe('Data is not json');
  });

  it('should upload json correctly', () => {
    s3.upload(
      {
        Bucket: process.env.AWS_BUCKET,
        ACL: 'public-read',
        Key: jsonKey,
        ContentType: 'application/json',
        Body: JSON.stringify(testJson),
      },
      (_err, data) => {
        expect(data.Location).toBe(`${process.env.AWS_BUCKET_URL}${jsonKey}`);
      }
    );
  });

  it('should retrieve json correctly', async () => {
    const data = await s3.getObject('test/json', process.env.AWS_BUCKET);
    expect(JSON.stringify(data)).toStrictEqual(JSON.stringify(testJson));
  });

  it('should upload file correctly', async () => {
    const key = `test/image_${timeStamp()}`;
    const file = fs.readFileSync(
      path.resolve(__dirname, '../../utils/resources/1.jpg')
    );
    s3.upload(
      {
        Bucket: process.env.AWS_BUCKET,
        ACL: 'public-read',
        Key: key,
        ContentType: 'image/jpg',
        Body: file,
      },
      (_err, data) => {
        expect(data.Location).toBe(`${process.env.AWS_BUCKET_URL}${key}`);
      }
    );
  });
});
