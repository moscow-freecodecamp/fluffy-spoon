import test from 'ava';
import createUserValidator from '../createUser';

test('it requires a name to be present', t => {
  const body = {
    email: 'user@example.org',
    password: 'foo',
  };
  const result = createUserValidator({ body });

  t.truthy(result.errors);
  t.is(result.errors.name, '"name" is required');
});

test('it requires name to be a string', t => {
  const body = {
    name: [],
    email: 'user@example.org',
    password: 'foo',
  };
  const result = createUserValidator({ body });

  t.truthy(result.errors);
  t.is(result.errors.name, '"name" must be a string');
});

test('it requires name to be at least two characters long', t => {
  const body = {
    name: 'a',
    email: 'user@example.org',
    password: 'foo',
  };
  const result = createUserValidator({ body });

  t.truthy(result.errors);
  t.is(result.errors.name, '"name" length must be at least 2 characters long');
});

test('it requires a email to be present', t => {
  const body = {
    name: 'Marie Armstrong',
    password: 'foo',
  };
  const result = createUserValidator({ body });

  t.truthy(result.errors);
  t.is(result.errors.email, '"email" is required');
});

test('it requires email to be a valid email address', t => {
  const body = {
    name: 'Marie Armstrong',
    email: '123',
    password: 'foo',
  };
  const result = createUserValidator({ body });

  t.truthy(result.errors);
  t.is(result.errors.email, '"email" must be a valid email');
});

test('it requires a password to be present', t => {
  const body = {
    name: 'Marie Armstrong',
    email: 'user@example.org',
  };
  const result = createUserValidator({ body });

  t.truthy(result.errors);
  t.is(result.errors.password, '"password" is required');
});

test('it requires password to be a string', t => {
  const body = {
    name: 'Marie Armstrong',
    email: 'user@example.org',
    password: [],
  };
  const result = createUserValidator({ body });

  t.truthy(result.errors);
  t.is(result.errors.password, '"password" must be a string');
});

test('it requires password not to be empty', t => {
  const body = {
    name: 'Marie Armstrong',
    email: 'user@example.org',
    password: '',
  };
  const result = createUserValidator({ body });

  t.truthy(result.errors);
  t.is(result.errors.password, '"password" is not allowed to be empty');
});

test('it requires city to be a string', t => {
  const body = {
    name: 'Marie Armstrong',
    email: 'user@example.org',
    password: 'foo',
    city: [],
  };
  const result = createUserValidator({ body });

  t.truthy(result.errors);
  t.is(result.errors.city, '"city" must be a string');
});

test('it requires city not to be empty', t => {
  const body = {
    name: 'Marie Armstrong',
    email: 'user@example.org',
    password: 'foo',
    city: '',
  };
  const result = createUserValidator({ body });

  t.truthy(result.errors);
  t.is(result.errors.city, '"city" is not allowed to be empty');
});

test('it requires skills to be an array', t => {
  const body = {
    name: 'Marie Armstrong',
    email: 'user@example.org',
    password: 'foo',
    skills: {},
  };
  const result = createUserValidator({ body });

  t.truthy(result.errors);
  t.is(result.errors.skills, '"skills" must be an array');
});

test('it requires each skill to be a string', t => {
  const body = {
    name: 'Marie Armstrong',
    email: 'user@example.org',
    password: 'foo',
    skills: [{}],
  };
  const result = createUserValidator({ body });

  t.truthy(result.errors);
  t.is(result.errors['skills.0'], '"0" must be a string');
});

test('it requires each skill not to be empty', t => {
  const body = {
    name: 'Marie Armstrong',
    email: 'user@example.org',
    password: 'foo',
    skills: [''],
  };
  const result = createUserValidator({ body });

  t.truthy(result.errors);
  t.is(result.errors['skills.0'], '"0" is not allowed to be empty');
});
