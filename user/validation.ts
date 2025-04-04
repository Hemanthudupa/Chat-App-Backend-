import Joi from "joi";

export const validateSignUp = Joi.object({
  userName: Joi.string().required().messages({
    "string.base": "userName should be an string ",
    "any.required": "userName is required field ",
  }),
  password: Joi.string().required().messages({
    "string.base": "password should be an string ",
    "any.required": "password is required field ",
  }),
  email: Joi.string()
    .pattern(/@gmail\.com$/, "Gmail-only")
    .required()
    .messages({
      "string.base": "email should be an string ",
      "any.required": "email is required field ",
    }),
  phoneNumber: Joi.string().required().messages({
    "string.base": "phoneNumber should be an string ",
    "any.required": "phoneNumber is required field ",
  }),
  destination: Joi.any().optional().messages({
    "destination.base": "destination should be an file ",
    "any.required": "destination is required field ",
  }),
});

export const validateSignData = Joi.object({
  email: Joi.string().required().messages({
    "string.base": "email should be an string ",
    "any.required": "email is required field ",
  }),
  password: Joi.string().required().messages({
    "string.base": "password should be an string ",
    "any.required": "password is required field ",
  }),
});
