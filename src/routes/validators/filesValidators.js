import multipartUpload from '../middlewares/multipartUpload';

const createFileValidator = [
  multipartUpload([
    {
      name: 'file',
      maxCount: 1,
      minCount: 1,
      size: 150000,
      required: true,
    },
  ]),
];

// eslint-disable-next-line import/prefer-default-export
export { createFileValidator };
