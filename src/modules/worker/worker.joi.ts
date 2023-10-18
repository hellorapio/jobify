import Joi from "joi";
import validators from "../../utils/validators";

const gender = Joi.string().valid("Female", "Male");

const photo = Joi.string().uri();
const birthDate = Joi.date().max("now");
const address = Joi.string().alphanum();
const coordinates = Joi.array().items(Joi.number(), Joi.number());
const experience = Joi.array().items(Joi.string());
const education = Joi.array().items(Joi.string());
const experienceYears = Joi.number().min(0);
const age = Joi.number().min(0).integer();
const resume = Joi.string().uri();
const livesIn = Joi.object({
  type: Joi.string().valid("point"),
  coordinates,
  address,
});

const update = Joi.object({
  name: validators.name,
  photo,
  gender,
  birthDate,
  livesIn,
  experience,
  education,
  experienceYears,
  age,
  resume,
  username: validators.username,
});

const workerId = Joi.object({ workerId: validators.id.required() });
const username = Joi.object({ username: validators.username.required() });

export default { update, workerId, username };
