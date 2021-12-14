import Joi from "joi";
import { TestingEntry } from "../types";

export function validateTestingRequest(format: TestingEntry) {
  const schema = Joi.object({
    code: Joi.string().required(),
    gogc: Joi.string().allow("").optional(),
    godebug: Joi.string().allow("").optional(),
    buildFlags: Joi.string().allow("").optional(),
    testFlags: Joi.string().allow("").optional(),
    version: Joi.string()
      .allow("")
      .pattern(new RegExp("^\\d+(.\\d+)?$"))
      .optional(),
  });

  return schema.validate(format);
}
