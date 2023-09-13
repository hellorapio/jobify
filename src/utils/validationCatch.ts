import Joi from "joi";
import AppError from "./appError";

export default async (joiObject:Joi.Schema, object: object) => {
  return await joiObject.validateAsync(object).catch((err) => {
    throw new AppError(err.message, 400);
  });
};
