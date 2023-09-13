import Joi from "joi";

const title = Joi.string().trim().required();
const description = Joi.string().min(100).trim().required();
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
const contactEmail = Joi.string().email().trim().lowercase().required();
