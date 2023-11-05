import Joi from "joi";

const create = Joi.object({
  plan: Joi.string().valid("starter", "professional"),
  duration: Joi.string().valid("monthly", "annually"),
});

export default { create };
