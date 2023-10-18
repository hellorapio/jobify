import Joi from "joi";

const id = Joi.string()
  .trim()
  .lowercase()
  .regex(/^[0-9a-fA-F]{24}$/)
  .message("Invalid id");

const name = Joi.string()
  .min(3)
  .max(30)
  .regex(/^[A-Za-z\s]+$/)
  .message(
    "Please don't include numbers or special chracters in your name"
  );

const email = Joi.string()
  .lowercase()
  .trim()
  .email()
  .message("Email is not Valid")
  .required()
  .messages({
    "any.required": "email is required",
  });

const username = Joi.string()
  .trim()
  .lowercase()
  .regex(/^[a-zA-Z0-9-]*$/)
  .message("Username is not Valid");

export default { id, email, username, name };
