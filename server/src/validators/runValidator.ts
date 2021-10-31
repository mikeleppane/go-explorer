import Joi from "joi";
import { RunEntry } from "../types";

export function validateRunRequest(format: RunEntry) {
  const schema = Joi.object({
    code: Joi.string().required(),
    goos: Joi.string().optional(),
    goarch: Joi.string().optional(),
    gogc: Joi.string().optional(),
    godebug: Joi.string().optional(),
    buildOptions: Joi.object().optional(),
    version: Joi.string().pattern(new RegExp("^\\d+(.\\d+)?$")).optional(),
  });

  return schema.validate(format);
}
