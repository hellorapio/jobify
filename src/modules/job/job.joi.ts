import Joi from "joi";
import validators from "../../utils/validators";

const title = Joi.string().trim();
const description = Joi.string().min(50).trim();
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

const address = Joi.string()
  .trim()
  .regex(/^[a-zA-Z0-9-,\s]*$/);

// const location = Joi.object({
//   coordinates: Joi.array().items(
//     Joi.number().min(-180).max(180).required(),
//     Joi.number().min(-90).max(90).required()
//   ),
// });

const create = Joi.object({
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
  // location,
  address: address.required(),
  salary,
  employmentType,
  currency,
});

// if remote was true it shouldn't provide location

const update = Joi.object({
  title,
  description,
  experienceLevel,
  educationLevel,
  contactEmail,
  applyUrl,
  skills,
  benefits,
  jobFunction,
  address,
  remote,
  // location,
  salary,
  employmentType,
  currency,
});

const distance = Joi.number().min(1);
const unit = Joi.string().valid("km", "mi");
const lat = Joi.number().min(-90).max(90);
const lng = Joi.number().min(-180).max(180);

const withIn = Joi.object({
  lng,
  lat,
  address,
  distance,
  unit,
});

const username = Joi.object({ username: validators.username });
const slug = Joi.object({ slug: validators.username });

export default { create, update, username, slug, withIn };
