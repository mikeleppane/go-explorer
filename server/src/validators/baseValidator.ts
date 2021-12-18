import Joi from "joi";

export const baseSchema = Joi.object({
  code: Joi.string().required(),
  version: Joi.string()
    .allow("")
    .pattern(new RegExp("^\\d+(.\\d+)?([-a-z0-9]+)?$"))
    .optional(),
});
