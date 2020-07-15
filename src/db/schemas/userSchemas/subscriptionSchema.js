import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
    _id: false,
  }
);

export default subscriptionSchema;
