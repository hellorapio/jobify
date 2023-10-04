import Joi from "joi";
import BadRequest from "../errors/badRequest";

const validCatch = async (joiObject: Joi.Schema, object: object) => {
  return await joiObject.validateAsync(object).catch((err) => {
    throw new BadRequest(err.message);
  });
};

export default validCatch;
