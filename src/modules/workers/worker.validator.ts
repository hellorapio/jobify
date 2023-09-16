import Joi from "joi";

const gender = Joi.string().valid("Female", "Male");
const name = Joi.string()
  .min(3)
  .max(30)
  .regex(/^[A-Za-z\s]+$/)
  .message(
    "Please don't include numbers or special chracters in your name"
  );
const photo = Joi.string().uri();
const birthDate = Joi.date().max("now");
const address = Joi.string().alphanum();
const coordinates = Joi.array().items(Joi.number(), Joi.number());
const experience = Joi.array().items(Joi.string());
const education = Joi.array().items(Joi.string());
const experienceYears = Joi.number().min(0);
const age = Joi.number().min(0).integer();
const resume = Joi.string().uri();

const createWorker = Joi.object({
  name: name.required(),
  photo,
  gender,
  birthDate,
  livesIn: Joi.object({
    type: Joi.string().valid("point"),
    coordinates,
    address,
  }),
  experience,
  education,
  experienceYears,
  age,
  resume,
});

const updateWorker = Joi.object({
  name,
  photo,
  gender,
  birthDate,
  livesIn: Joi.object({
    type: Joi.string().valid("point"),
    coordinates,
    address,
  }),
  experience,
  education,
  experienceYears,
  age,
  resume,
});

export default { createWorker, updateWorker };
