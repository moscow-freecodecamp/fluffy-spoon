import test from 'ava';
import { connectDb, dropDb } from '../../tests/utils';
import User from '../User';

test.before(connectDb);
test.afterEach.always(dropDb);

test('it requires name to be specified', async t => {
  t.plan(1);

  const model = new User({
    email: 'user@example.org',
    passwordHash: 'foo',
  });

  try {
    await model.save();
  } catch (error) {
    t.is(
      error.message,
      'User validation failed: name: Path `name` is required.'
    );
  }
});

test('it requires email to be specified', async t => {
  t.plan(1);

  const model = new User({
    name: 'Bobby Santiago',
    passwordHash: 'foo',
  });

  try {
    await model.save();
  } catch (error) {
    t.is(
      error.message,
      'User validation failed: email: Path `email` is required.'
    );
  }
});

test('it trims the name', t => {
  const model = new User({
    name: '  Wilbert Mack  ',
    email: 'user@example.org',
    passwordHash: 'foo',
  });

  t.is(model.name, 'Wilbert Mack');
});

test('it trims the email', t => {
  const model = new User({
    name: 'Wilbert Mack',
    email: '  user@example.org  ',
    passwordHash: 'foo',
  });

  t.is(model.email, 'user@example.org');
});

test('it lowercases the email', t => {
  const model = new User({
    name: 'Bobby Santiago',
    email: 'fOo@BaR.bAz',
    passwordHash: 'foo',
  });

  t.is(model.email, 'foo@bar.baz');
});

test('it trims the skills', t => {
  const model = new User({
    name: 'Wilbert Mack',
    email: 'user@example.org',
    passwordHash: 'foo',
    skills: [' foo '],
  });

  t.is(model.skills[0], 'foo');
});

test('it trims the city', t => {
  const model = new User({
    name: 'Wilbert Mack',
    email: 'user@example.org',
    passwordHash: 'foo',
    city: ' Foo ',
  });

  t.is(model.city, 'Foo');
});

test('it trims the "about" details', t => {
  const model = new User({
    name: 'Wilbert Mack',
    email: 'user@example.org',
    passwordHash: 'foo',
    about: ' Foo ',
  });

  t.is(model.about, 'Foo');
});
