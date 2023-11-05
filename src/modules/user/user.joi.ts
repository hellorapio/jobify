import Joi from "joi";
import validators from "../../utils/validators";

const address = Joi.string()
  .trim()
  .regex(/^[a-zA-Z0-9-,\s]*$/);

const coordinates = Joi.array().items(
  Joi.number().min(-180).max(180).required(),
  Joi.number().min(-90).max(90).required()
);
// Company

const companyDescription = Joi.string().min(60).trim();
const photo = Joi.string().valid("");
const numberOfEmployees = Joi.number().integer().positive();
const revenue = Joi.number().integer().positive();
const contactInformation = Joi.object({
  email: Joi.string().lowercase().trim().email(),
  website: Joi.string().uri().lowercase().trim(),
  linkedinProfile: Joi.string().lowercase().trim().alphanum(),
  twitterProfile: Joi.string().lowercase().trim().alphanum(),
  phone: Joi.string(),
});
const industry = Joi.array().items(Joi.string().trim().lowercase());
const locations = Joi.array().items(
  Joi.object({
    type: Joi.string().valid("point"),
    coordinates,
    address,
  })
);
const founded = Joi.date().max("now");

// Worker

const gender = Joi.string().valid("female", "male");
const birthDate = Joi.date().max("now");
const experience = Joi.array().items(Joi.string());
const education = Joi.array().items(Joi.string());
const experienceYears = Joi.number().min(0);
const DOB = Joi.date().max("now");
const resume = Joi.string().uri();

const updateWorker = Joi.object({
  name: validators.name,
  address,
  photo,
  gender,
  birthDate,
  experience,
  education,
  experienceYears,
  DOB,
  resume,
  username: validators.username,
});

const username = Joi.object({ username: validators.username.required() });

const updateCompany = Joi.object({
  name: validators.name,
  photo,
  companyDescription,
  numberOfEmployees,
  revenue,
  contactInformation,
  industry,
  locations,
  founded,
  username: validators.username,
});

export default { updateCompany, updateWorker, username };
