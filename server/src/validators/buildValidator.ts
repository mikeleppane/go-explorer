import Joi from "joi";
import { BuildEntry } from "../types";

export function validateBuild(format: BuildEntry) {
  const schema = Joi.object({
    code: Joi.string().required(),
    goos: Joi.string().optional(),
    goarch: Joi.string().optional(),
    gcflags: Joi.string().optional(),
    version: Joi.string().optional(),
  });

  return schema.validate(format);
}
