import Joi from "joi";
import validators from "../../utils/validators";

const status = Joi.string().valid("Interviewing", "Rejected", "Accepted");

const letter = Joi.string().min(50).trim();

const create = Joi.object({
  letter: letter.required(),
});

const updateStatus = Joi.object({
  status,
});

const updateLetter = Joi.object({
  letter,
});

const ids = Joi.object({
  applicantId: validators.id,
  slug: validators.username,
  company: validators.id,
});
const query = Joi.object({
  page: validators.page,
  limit: validators.limit,
});

export default {
  create,
  updateStatus,
  updateLetter,
  ids,
  query,
};
