import test from 'ava';
import request from 'supertest';
import factory from './factory';
import { connectDb, dropDb } from './utils';
import app from '../app';

test.before(connectDb);
test.afterEach.always(dropDb);

test.serial('returns empty list when database contains no users', async t => {
  const response = await request(app)
    .get('/api/users')
    .expect(200);

  t.deepEqual(response.body, {
    total: 0,
    items: [],
  });
});

test.serial('returns a list of users', async t => {
  const user = await factory.create('User', {
    name: 'John Smith',
    email: 'j.smith@example.org',
    passwordHash: 'foo',
    skills: ['javascript', 'php'],
    city: 'Moscow',
  });

  const response = await request(app)
    .get('/api/users')
    .expect(200);

  t.deepEqual(response.body, {
    total: 1,
    items: [
      {
        id: user._id.toString(),
        name: 'John Smith',
        skills: ['javascript', 'php'],
        city: 'Moscow',
      },
    ],
  });
});

test.serial('it allows to retrieve only a segment of all users', async t => {
  await Promise.all(
    [
      { name: 'John Wayne' },
      { name: 'Tom York' },
      { name: 'Mary Sue' },
      { name: 'James Brown' },
      { name: 'Susan Kurtz' },
    ].map(buildOptions => factory.create('User', buildOptions))
  );

  const response = await request(app)
    .get('/api/users?offset=1&limit=3')
    .expect(200);

  t.is(response.body.total, 5);
  t.is(response.body.items[0].name, 'Tom York');
  t.is(response.body.items.length, 3);
});
