import Joi from "joi";
import validators from "../../utils/validators";

const review = Joi.string().min(50).trim();
const rate = Joi.number().integer().positive().min(1).max(5);
const pros = Joi.string().trim();
const cons = Joi.string().trim();

const sortRate = Joi.string().pattern(/^[-]?rate$/);
const sortCreated = Joi.string().pattern(/^[-]?createdAt$/);
const sortTotal = Joi.alternatives().try(sortRate, sortCreated);
const sort = Joi.alternatives().try(
  sortTotal,
  Joi.array().items(sortTotal)
);

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

const query = Joi.object({
  page: validators.page,
  sort,
});

export default { create, update, ids, query };
