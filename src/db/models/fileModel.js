import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import fileSchema from '../schemas/fileSchemas/fileSchema';

fileSchema.plugin(mongoosePaginate);

const File = mongoose.model('File', fileSchema);

export default File;
