import Joi from "joi";
import BadRequest from "../errors/badRequest";

const validCatch = async (schema: Joi.Schema, object: object) => {
  return await schema.validateAsync(object).catch((err) => {
    throw new BadRequest(err.message);
  });
};

export default validCatch;
