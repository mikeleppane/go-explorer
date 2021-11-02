import Joi from "joi";
import { RunEntry } from "../types";

export function validateRunRequest(format: RunEntry) {
  const schema = Joi.object({
    code: Joi.string().required(),
    gogc: Joi.string().optional(),
    godebug: Joi.string().optional(),
    buildFlags: Joi.string().optional(),
    version: Joi.string().pattern(new RegExp("^\\d+(.\\d+)?$")).optional(),
  });

  return schema.validate(format);
}
