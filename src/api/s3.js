import S3 from 'aws-sdk/clients/s3';
import logHandler, { s3Error } from '../complements/subscribers/logSubscriber';

const s3 = new S3({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  region: 'us-west-2',
});

const handleResponse = (err, data, callback) => {
  if (err) {
    logHandler.emit('error', s3Error(err));
  }
  if (callback) callback(err, data);
};

/**
 * Get an object from a s3 bucket
 * @param  {string} key - Object location in the bucket
 * @param  {string} bucket - AWS bucket name
 * @return {object}     - A promise containing the response
 */
const getObject = (key, bucket = null) =>
  new Promise((resolve) => {
    s3.getObject(
      {
        Bucket: bucket || process.env.AWS_BUCKET,
        Key: key,
      },
      (err, data) => {
        if (err) handleResponse(err, data, () => resolve(null));
        else {
          if (data.ContentType === 'application/json') {
            resolve(JSON.parse(data.Body.toString('utf-8')));
          }
          resolve('Data is not json');
        }
      }
    );
  });

/**
 * Upload an object to a s3 bucket
 * @param  {obj} params - Param object
 * @param  {funciton} callback - Callback after file has been uploaded
 * @paramExample: {
 *   Bucket: process.env.s3Bucket,
 *   ACL: 'bucket-owner-full-control' || 'public-read',
 *   Key: `files`,
 *   ContentType: 'application/json',
 *   Body: JSON.stringify(data) || buffer,
 * }
 */
const upload = (params, callback) => {
  const response = s3.upload(params, (err, data) =>
    handleResponse(err, data, callback)
  );
  return response;
};

export default {
  getObject,
  upload,
};
