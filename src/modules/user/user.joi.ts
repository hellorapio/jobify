import Joi from "joi";
import validators from "../../utils/validators";

const updateMe = Joi.object({ email: validators.email });

export default { updateMe };
