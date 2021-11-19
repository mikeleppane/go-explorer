import Joi from "joi";
import { RunEntry } from "../types";

export function validateRunRequest(format: RunEntry) {
  const schema = Joi.object({
    code: Joi.string().required(),
    gogc: Joi.string().allow("").optional(),
    godebug: Joi.string().allow("").optional(),
    buildFlags: Joi.string().allow("").optional(),
    version: Joi.string()
      .allow("")
      .pattern(new RegExp("^\\d+(.\\d+)?$"))
      .optional(),
  });

  return schema.validate(format);
}
