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
const minExperience = Joi.number().integer().positive();
const maxExperience = Joi.number()
  .integer()
  .positive()
  .min(Joi.ref("minExperience") ? Joi.ref("minExperience") : 0);
const remote = Joi.bool();
const categories = Joi.array().items(
  Joi.string().valid(
    "engineering",
    "software",
    "tech",
    "sales",
    "marketing",
    "analytics",
    "product",
    "design",
    "customer service",
    "finance",
    "human resources",
    "healthcare",
    "others"
  )
);
const tags = Joi.array().items(Joi.string());
const experienceLevel = Joi.string().valid(
  "mid-level",
  "entry",
  "junior",
  "senior"
);
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
  contactEmail,
  applyUrl,
  skills,
  benefits,
  categories,
  remote,
  tags,
  minExperience,
  maxExperience,
  address: address.required(),
  salary,
  employmentType,
  currency,
});

const update = Joi.object({
  title,
  description,
  experienceLevel,
  educationLevel,
  contactEmail,
  applyUrl,
  minExperience,
  maxExperience,
  skills,
  benefits,
  categories,
  address,
  tags,
  remote,
  salary,
  employmentType,
  currency,
});

const distance = Joi.number().min(1).default(100);
const unit = Joi.string().valid("km", "mi").default("mi");
const lat = Joi.number().min(-90).max(90);
const lng = Joi.number().min(-180).max(180);

const query = Joi.object({
  page: validators.page,
  limit: validators.limit,
  sort: validators.sort,
  fields: validators.fields,
  title,
  experienceLevel,
  educationLevel,
  remote,
  address,
  salary,
  currency,
});

const withIn = query.append({
  lng,
  lat,
  distance,
  unit,
});

const username = Joi.object({ username: validators.username });
const slug = Joi.object({ slug: validators.username });

export default { create, update, username, slug, withIn, query };
