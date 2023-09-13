import Joi from "joi";

const status = Joi.string().valid(
  "Pending",
  "Interviewing",
  "Rejected",
  "Accepted"
);

const letter = Joi.string().min(50).trim().required();
