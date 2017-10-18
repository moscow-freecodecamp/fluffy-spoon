/**
 * Custom middleware for request validation
 *
 * Validator function must return an object with truthy errors field in case of errors.
 * Middleware throws an error in case of validation errors.
 */
const validatorMiddleware = validator => (req, res, next) => {
  const result = validator(req, res);

  if (result.errors) {
    res.status(401).json({
      message: 'Validation failed',
      errors: result.errors,
    });
  }

  next();
};

export default validatorMiddleware;
