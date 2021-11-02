import Joi from "joi";
import { TestingEntry } from "../types";

export function validateTestingRequest(format: TestingEntry) {
  const schema = Joi.object({
    code: Joi.string().required(),
    gogc: Joi.string().optional(),
    godebug: Joi.string().optional(),
    buildFlags: Joi.string().optional(),
    testFlags: Joi.string().optional(),
    version: Joi.string().pattern(new RegExp("^\\d+(.\\d+)?$")).optional(),
  });

  return schema.validate(format);
}
