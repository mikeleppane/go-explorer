import Joi from "joi";
import { BuildEntry } from "../types";
import { baseSchema } from "./baseValidator";

export function validateBuildRequest(format: BuildEntry) {
  const schema = baseSchema.append({
    goos: Joi.string().allow("").optional(),
    goarch: Joi.string().allow("").optional(),
    gogc: Joi.string().allow("").optional(),
    godebug: Joi.string().allow("").optional(),
    buildFlags: Joi.string().allow("").optional(),
    symregexp: Joi.string().allow("").optional(),
  });

  return schema.validate(format);
}
