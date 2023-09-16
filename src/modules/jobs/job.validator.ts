import Joi from "joi";

const title = Joi.string().trim();
const description = Joi.string().min(100).trim();
const currency = Joi.string().valid("GBP", "EUR", "YEN", "USD", "CHF");
const employmentType = Joi.string().valid(
  "full-time",
  "part-time",
  "contract",
  "internship"
);
const salary = Joi.number().integer().positive();
const remote = Joi.bool();
const jobFunction = Joi.string().valid(
  "engineering",
  "sales",
  "marketing",
  "product",
  "design",
  "customer service",
  "finance",
  "human resources",
  "healthcare",
  "others"
);
const experienceLevel = Joi.string().valid("mid", "entry", "senior");
const educationLevel = Joi.string().valid(
  "high school",
  "associate",
  "bachelor",
  "master",
  "doctorate"
);
const contactEmail = Joi.string().email().trim().lowercase();
const applyUrl = Joi.string().uri().trim().lowercase();

const skills = Joi.array().items(Joi.string());
const benefits = Joi.array().items(Joi.string());

const createJob = Joi.object({
  title: title.required(),
  description: description.required(),
  experienceLevel,
  educationLevel,
  contactEmail: contactEmail.required(),
  applyUrl: applyUrl.required(),
  skills: skills.required(),
  benefits: benefits.required(),
  jobFunction,
  remote,
  salary,
  employmentType,
  currency,
});

const updateJob = Joi.object({
  title,
  description,
  experienceLevel,
  educationLevel,
  contactEmail,
  applyUrl,
  skills,
  benefits,
  jobFunction,
  remote,
  salary,
  employmentType,
  currency,
});

export default { createJob, updateJob };
