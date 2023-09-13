import Joi from "joi";

const companyDescription = Joi.string().min(120).trim();
const numberOfEmployees = Joi.number().integer().positive();
const revenue = Joi.number().integer().positive();
const contactInformation = Joi.object({
  email: Joi.string().lowercase().trim().email(),
  website: Joi.string().uri().lowercase().trim(),
  linkedinProfile: Joi.string().lowercase().trim().alphanum(),
  twitterProfile: Joi.string().lowercase().trim().alphanum(),
  phone: Joi.string(),
});

export default Joi.object({
  companyDescription,
  numberOfEmployees,
  revenue,
  contactInformation,
});
