import Joi from "joi";

const email = Joi.string()
  .lowercase()
  .trim()
  .email()
  .message("Email is not Valid")
  .required()
  .messages({
    "any.required": "email is required",
  });

const password = Joi.string()
  .regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  )
  .message("Password isn't strong enough")
  .required()
  .messages({
    "any.required": "password is required",
  });

const name = Joi.string()
  .trim()
  .required()
  .messages({
    "any.required": "the name is required",
  });

const role = Joi.string().valid("worker", "company").messages({
  "any.only": "Invalid Role",
});

const passwordConfirm = Joi.string()
  .valid(Joi.ref("password"))
  .required()
  .messages({
    "any.only": "passwords doesn't match up",
  });

const resetToken = Joi.string()
  .hex()
  .length(64)
  .message("Reset Link is not Found")
  .required();

const login = Joi.object({
  email,
  password,
});

const signup = Joi.object({
  name,
  email,
  role,
  password,
  passwordConfirm,
});

const updatePassword = Joi.object({
  currentPassword: password,
  password,
  passwordConfirm,
});

const resetPassword = Joi.object({
  token: resetToken,
  password,
  passwordConfirm,
});

const forgotPassword = Joi.object({
  email,
});

export default {
  login,
  signup,
  resetPassword,
  updatePassword,
  forgotPassword,
};
