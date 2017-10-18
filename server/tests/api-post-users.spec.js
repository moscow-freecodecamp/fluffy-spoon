import test from 'ava';
import request from 'supertest';
import { User } from '../models';
import { connectDb, dropDb } from './utils';
import app from '../app';

test.before(connectDb);
test.afterEach.always(dropDb);

test.serial('creates a new user', async t => {
  await request(app)
    .post('/api/users')
    .send({
      name: 'Nelson Price',
      email: 'user@example.org',
      password: 'secret',
    })
    .expect(201);

  t.is(await User.count(), 1);

  const user = (await User.findOne({})).toJSON();

  delete user._id;
  delete user.__v;
  delete user.passwordHash;

  t.deepEqual(user, {
    name: 'Nelson Price',
    email: 'user@example.org',
    city: null,
    skills: [],
    about: null,
  });
});

test.serial('throws 401 on validation error', async t => {
  const response = await request(app)
    .post('/api/users')
    .send({
      name: 'Nelson Price',
      password: 'secret',
    })
    .expect(401);

  t.is(await User.count(), 0);
  t.is(response.body.message, 'Validation failed');
  t.is(response.body.errors.email, '"email" is required');
});
