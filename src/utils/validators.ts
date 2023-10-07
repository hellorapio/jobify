import Joi from "joi";

const id = Joi.string()
  .trim()
  .lowercase()
  .regex(/^[0-9a-fA-F]{24}$/)
  .message("Invalid id");

const email = Joi.string()
  .lowercase()
  .trim()
  .email()
  .message("Email is not Valid")
  .required()
  .messages({
    "any.required": "email is required",
  });

export default { id, email };
