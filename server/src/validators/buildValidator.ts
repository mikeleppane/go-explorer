import Joi from "joi";
import { BuildEntry } from "../types";

export function validateBuildRequest(format: BuildEntry) {
  const schema = Joi.object({
    code: Joi.string().required(),
    goos: Joi.string().optional(),
    goarch: Joi.string().optional(),
    gogc: Joi.string().optional(),
    godebug: Joi.string().optional(),
    buildFlags: Joi.string().optional(),
    symregexp: Joi.string().optional(),
    version: Joi.string().pattern(new RegExp("^\\d+(.\\d+)?$")).optional(),
  });

  return schema.validate(format);
}
