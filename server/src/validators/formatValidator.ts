import Joi from "joi";
import { FormatEntry } from "../types";

export function validateFormatRequest(format: FormatEntry) {
  const schema = Joi.object({
    code: Joi.string().required(),
    version: Joi.string().pattern(new RegExp("^\\d+(.\\d+)?$")).optional(),
  });

  return schema.validate(format);
}
