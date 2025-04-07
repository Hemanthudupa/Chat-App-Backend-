import Joi from "joi";
export const validationMessageBody = Joi.object({
  senderUserId: Joi.string()
    .required()
    .uuid({
      version: "uuidv4",
    })
    .messages({
      "uuid.base": "senderUserId should be proper user id format ",
      "string.base": " senderUserId should be proper string of user id format ",
      "any.required": "senderUserId is an required field ",
    }),
  contactId: Joi.string()
    .required()
    .uuid({
      version: "uuidv4",
    })
    .messages({
      "uuid.base": "contactId should be proper user id format ",
      "string.base": " contactId should be proper string of user id format ",
      "any.required": "contactId is an required field ",
    }),
  message: Joi.string().required().messages({
    "string.base": " message should be proper string",
    "any.required": "message is an required field ",
  }),
  imagesPath: Joi.string().optional().messages({
    "string.base": " imagesPath should be proper string of path ",
    "any.required": "imagesPath is an required field ",
  }),
});

export const validateGetMessageReqBody = Joi.object({
  from: Joi.string()
    .required()
    .uuid({
      version: "uuidv4",
    })
    .messages({
      "uuid.base": "from should be proper user id format ",
      "string.base": " from should be proper string of user id format ",
      "any.required": "from is an required field ",
    }),
  to: Joi.string()
    .required()
    .uuid({
      version: "uuidv4",
    })
    .messages({
      "uuid.base": "to should be proper user id format ",
      "string.base": " to should be proper string of user id format ",
      "any.required": "to is an required field ",
    }),
});
