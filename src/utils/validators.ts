import Joi from "joi";

const id = Joi.string()
  .trim()
  .lowercase()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required();

const mongoId = Joi.object({ id });

export default { mongoId };
