import Joi from "joi";
import validators from "../../utils/validators";

const email = validators.email
  .required()
  .messages({ "any.required": "Email is Required" });

const password = Joi.string().required().messages({
  "any.required": "password is required",
});

const newPass = password
  .regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  )
  .message("Password isn't strong enough");

const role = Joi.string().valid("worker", "company").required().messages({
  "any.only": "Invalid Role",
  "any.required": "Role is Required for signup",
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
  .message("Reset Token is not Valid")
  .required();

const login = Joi.object({
  email,
  password,
});

const signup = Joi.object({
  email,
  role,
  password: newPass,
  passwordConfirm,
});

const updatePassword = Joi.object({
  currentPassword: password,
  password: newPass,
  passwordConfirm,
});

const resetPassword = Joi.object({
  password,
  passwordConfirm,
});

const token = Joi.object({
  token: resetToken,
});

const forgotPassword = Joi.object({
  email,
});

export default {
  login,
  signup,
  resetPassword,
  forgotPassword,
  updatePassword,
  token,
};
