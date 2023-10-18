import Joi from "joi";
import validators from "../../utils/validators";

const update = Joi.object({ email: validators.email });

export default { update };
