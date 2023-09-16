import Joi from "joi";
import { id } from "../../utils/validators";

const review = Joi.string().min(50).trim();
const rate = Joi.number().integer().positive().min(1).max(5);
const pros = Joi.string().trim();
const cons = Joi.string().trim();

const ids = Joi.object({
  companyId: id,
  reviewId: id,
});

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

export default { createReview, updateReview, ids };
