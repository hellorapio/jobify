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

const updateApplicantStatus = Joi.object({
  status,
});

const updateApplicantLetter = Joi.object({
  letter,
});

const ids = Joi.object({
  applicantId: validators.id,
  jobId: validators.id,
  companyId: validators.id,
});

export default {
  create,
  updateApplicantStatus,
  updateApplicantLetter,
  ids,
};
