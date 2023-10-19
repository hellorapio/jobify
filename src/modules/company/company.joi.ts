import Joi from "joi";
import validators from "../../utils/validators";

const companyDescription = Joi.string().min(120).trim();
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

// const createCompany = Joi.object({
//   name: validators.name.required(),
//   photo,
//   companyDescription,
//   numberOfEmployees,
//   revenue,
//   contactInformation,
//   industry,
//   locations,
//   founded,
// });

const update = Joi.object({
  name: validators.name,
  photo,
  companyDescription,
  numberOfEmployees,
  revenue,
  contactInformation,
  industry,
  locations,
  founded,
});

export default { update };
