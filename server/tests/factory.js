import { ObjectID } from 'mongodb';
import { factory, MongooseAdapter } from 'factory-girl';
import { User } from '../models';

factory.setAdapter(new MongooseAdapter());

factory.define('User', User, {
  _id: ObjectID,
  name: factory.seq('User.name', n => `User #${n}`),
  email: factory.seq('User.email', n => `user${n}@example.org`),
});

export default factory;
