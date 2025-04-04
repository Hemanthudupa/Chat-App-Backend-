import Joi from "joi";

export const validateContactDetails = Joi.object({
  contactName: Joi.string().disallow("").required().messages({
    "string.base": "contactName should be a string",
    "any.required": "contactName is a required field",
  }),
  phoneNumber: Joi.string().disallow("").required().messages({
    "string.base": "phoneNumber should be a string",
    "any.required": "phoneNumber is a required field",
  }),
});
