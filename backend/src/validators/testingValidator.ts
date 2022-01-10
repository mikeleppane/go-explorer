import Joi from "joi";
import { TestingEntry } from "../types";
import { baseSchema } from "./baseValidator";

export function validateTestingRequest(format: TestingEntry) {
  const schema = baseSchema.append({
    buildFlags: Joi.string().allow("").optional(),
    testFlags: Joi.string().allow("").optional(),
  });

  return schema.validate(format);
}
