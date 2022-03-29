const Joi = require("joi");

module.exports = {
  registerSchema: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().trim().lowercase().required(),
    password: Joi.string()
      .min(5)
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])/)
      .message(
        '"password" should contain a mix of uppercase and lowercase letters, numbers, and special characters '
      )
      .required(),
    role: Joi.string().required(),
  }),
  loginSchema: Joi.object({
    email: Joi.string().email().trim().lowercase().required(),
    password: Joi.string().required(),
  }),
  resetPasswordSchema: Joi.object({
    password: Joi.string()
      .min(5)
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])/)
      .message(
        '"password" should contain a mix of uppercase and lowercase letters, numbers, and special characters '
      )
      .required(),
    validationCode: Joi.string().required(),
  }),
};
