import Joi from "joi";
// import { id } from "../../utils/validators";

const status = Joi.string().valid(
  "Pending",
  "Interviewing",
  "Rejected",
  "Accepted"
);

const letter = Joi.string().min(50).trim();

const createApplicant = Joi.object({
  letter: letter.required(),
});

const updateApplicantStatus = Joi.object({
  status,
});

const updateApplicantLetter = Joi.object({
  letter,
});

const ids = Joi.object({
  // applicantId: id,
  // jobId: id,
  // companyId: id,
});

export default {
  createApplicant,
  updateApplicantStatus,
  updateApplicantLetter,
  ids,
};
