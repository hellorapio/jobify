import Joi from "joi";

const companyDescription = Joi.string().min(120).trim();
const name = Joi.string()
  .min(3)
  .max(30)
  .regex(/^[A-Za-z\s]+$/)
  .message(
    "Please don't include numbers or special chracters in your name"
  );
const photo = Joi.string().uri();
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
    coordinates: Joi.array().items(Joi.number(), Joi.number()),
    address: Joi.string().trim(),
  })
);
const founded = Joi.date().max("now");

const createCompany = Joi.object({
  name: name.required(),
  photo,
  companyDescription,
  numberOfEmployees,
  revenue,
  contactInformation,
  industry,
  locations,
  founded,
});

const updateCompany = Joi.object({
  name,
  photo,
  companyDescription,
  numberOfEmployees,
  revenue,
  contactInformation,
  industry,
  locations,
  founded,
});

export default { createCompany, updateCompany };
