import Joi from 'joi';

const bodySchema = Joi.object().keys({
  name: Joi.string()
    .min(2)
    .max(60)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
  city: Joi.string(),
  skills: Joi.array().items(Joi.string()),
});

const createUserValidator = req => {
  const result = Joi.validate(req.body, bodySchema);

  if (!result.error) {
    return {};
  }

  return {
    errors: result.error.details.reduce(
      (errors, { path, message }) => ({
        ...errors,
        [path.join('.')]: message,
      }),
      {}
    ),
  };
};

export default createUserValidator;
