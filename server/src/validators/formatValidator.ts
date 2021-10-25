import Joi from "joi";
import { FormatEntry } from "../types";

export function validateFormat(format: FormatEntry) {
  const schema = Joi.object({
    code: Joi.string().required(),
    version: Joi.string().optional(),
  });

  return schema.validate(format);
}
