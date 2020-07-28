import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';
import articleSchema from '../schemas/articleSchemas/articleSchema';

articleSchema.plugin(mongoosePaginate);
articleSchema.plugin(aggregatePaginate);

const Article = mongoose.model('Article', articleSchema);

export default Article;
