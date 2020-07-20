import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app';
import SuperError from '../src/complements/exceptions/SuperError';

const dbConnect = async () => {
  await mongoose.connect(
    'mongodb://127.0.0.1:27017/test',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        throw new SuperError(err);
      }
    }
  );
};

const testApp = request(app);

const removeAllCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  collections.forEach(async (collectionName) => {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  });
};

const dbClose = async () => {
  await mongoose.connection.close();
};

export { dbConnect, dbClose, removeAllCollections, testApp };
