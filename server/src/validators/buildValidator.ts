import Joi from "joi";
import { BuildEntry } from "../types";

export function validateBuildRequest(format: BuildEntry) {
  const schema = Joi.object({
    code: Joi.string().required(),
    goos: Joi.string().allow("").optional(),
    goarch: Joi.string().allow("").optional(),
    gogc: Joi.string().allow("").optional(),
    godebug: Joi.string().allow("").optional(),
    buildFlags: Joi.string().allow("").optional(),
    symregexp: Joi.string().allow("").optional(),
    version: Joi.string()
      .allow("")
      .pattern(new RegExp("^\\d+(.\\d+)?$"))
      .optional(),
  });

  return schema.validate(format);
}
