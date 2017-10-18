import mongoose from 'mongoose';
import mockgoose from 'mockgoose';

export const connectDb = () =>
  mockgoose(mongoose).then(() =>
    mongoose.connect('mongodb://mockhost:1/mern-test')
  );

export const dropDb = () => mockgoose.reset();
