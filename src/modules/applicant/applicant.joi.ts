import Joi from "joi";
import validators from "../../utils/validators";

const status = Joi.string().valid(
  "Pending",
  "Interviewing",
  "Rejected",
  "Accepted"
);

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
  job: validators.id,
  company: validators.id,
});

export default {
  create,
  updateStatus,
  updateLetter,
  ids,
};
