import mongoose from 'mongoose';
import app from './app';

if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true);
}

mongoose
  .connect(`${process.env.MONGODB_URL}/${process.env.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
    process.exit(1);
  });

app.listen(process.env.PORT, '0.0.0.0');
