import Joi from "joi";

export const id = Joi.string()
  .trim()
  .lowercase()
  .regex(/^[0-9a-fA-F]{24}$/)
  .message("Invalid id");

const mongoId = Joi.object({ id: id.required() });
export default { mongoId, id };
