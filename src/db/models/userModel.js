import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';
import { fullName, preSave, toJSON, createJWT } from '../methods/userMethods';
import userSchema from '../schemas/userSchemas/userSchema';

userSchema.methods.toJSON = toJSON;
userSchema.methods.fullName = fullName;
userSchema.methods.createJWT = createJWT;

userSchema.pre('save', preSave);

userSchema.plugin(mongoosePaginate);
userSchema.plugin(aggregatePaginate);

const User = mongoose.model('User', userSchema);

export default User;
