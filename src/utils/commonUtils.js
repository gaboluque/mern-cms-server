import moment from 'moment';
import mongoose from 'mongoose';

const timeStamp = () => moment().format('DDMMYYYY_HH:mm:ss');

const mongoId = (id) => mongoose.Types.ObjectId(id);

export { timeStamp, mongoId };
