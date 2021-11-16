// Validation
const Joi = require("@hapi/joi");

// Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  // login will be email and password
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.object().min(6).required(),
  });
  return schema.validate(data);
};
module.exports.registerValidation = registerValidation;

// the reason this is done is because might have another for login
// looking the same
module.exports.loginValidation = loginValidation;
