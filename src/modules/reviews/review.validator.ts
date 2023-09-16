import Joi from "joi";

const review = Joi.string().min(50).trim();
const rate = Joi.number().integer().positive().min(1).max(5);
const pros = Joi.string().trim();
const cons = Joi.string().trim();

const createReview = Joi.object({
  review: review,
  rate: rate.required(),
  pros,
  cons,
});

const updateReview = Joi.object({
  review,
  rate,
  pros,
  cons,
});

export default { createReview, updateReview };
