import test from 'ava';
import validatorMiddleware from '../validator';

function noop() {}

test('it calls the validator function with the request object', t => {
  const originalRequest = {
    body: {
      foo: 'bar',
    },
  };

  t.plan(1);

  const validator = req => {
    t.is(req, originalRequest);

    return {};
  };

  validatorMiddleware(validator)(originalRequest, {}, noop);
});

test('it throws an Error when validation fails', t => {
  const validator = () => ({
    errors: {
      foo: 'bar',
    },
  });

  t.throws(() => {
    validatorMiddleware(validator)({}, {}, noop);
  });
});

test('it delegate to next middleware when validation succeeds', t => {
  t.plan(1);

  const validator = () => ({});
  const next = () => t.pass();

  validatorMiddleware(validator)({}, {}, next);
});
