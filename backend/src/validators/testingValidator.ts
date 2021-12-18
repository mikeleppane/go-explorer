import Joi from "joi";
import { TestingEntry } from "../types";
import { baseSchema } from "./baseValidator";

export function validateTestingRequest(format: TestingEntry) {
  const schema = baseSchema.append({
    gogc: Joi.string().allow("").optional(),
    godebug: Joi.string().allow("").optional(),
    buildFlags: Joi.string().allow("").optional(),
    testFlags: Joi.string().allow("").optional(),
  });

  return schema.validate(format);
}
