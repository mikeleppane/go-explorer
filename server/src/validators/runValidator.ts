import Joi from "joi";
import { RunEntry } from "../types";

export function validateRunRequest(format: RunEntry) {
  const schema = Joi.object({
    code: Joi.string().required(),
    goos: Joi.string().optional(),
    goarch: Joi.string().optional(),
    buildOptions: Joi.object().optional(),
    version: Joi.string().optional(),
  });

  return schema.validate(format);
}
