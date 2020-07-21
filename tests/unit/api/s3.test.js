import moment from 'moment';
import s3 from '../../../src/api/s3';

const testJson = {
  testData: {
    string: 'String',
    number: 0,
    array: [0, 'Data'],
  },
};

describe('s3 api', () => {
  const jsonKey = `test/json_${moment().format('DDMMYYYY_hhmmss')}`;

  it('should reject on file getObject', async () => {
    const video = await s3.getObject(
      'test/mp4_sample.mp4',
      process.env.AWS_BUCKET
    );
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
});
