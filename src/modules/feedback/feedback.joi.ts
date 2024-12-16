import Joi from "joi";
import validators from "../../utils/validators";

const create = Joi.object({
  name: validators.name,
  email: validators.email,
  message: Joi.string().min(20).max(400),
});

export default { create };
