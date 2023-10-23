import Joi from "joi";
import validators from "../../utils/validators";

const review = Joi.string().min(50).trim();
const rate = Joi.number().integer().positive().min(1).max(5);
const pros = Joi.string().trim();
const cons = Joi.string().trim();

const ids = Joi.object({
  username: validators.username,
  reviewId: validators.id,
});

const create = Joi.object({
  review: review,
  rate: rate.required(),
  pros,
  cons,
});

const update = Joi.object({
  review,
  rate,
  pros,
  cons,
});

export default { create, update, ids };
