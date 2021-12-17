import Joi from "joi";
import { RunEntry } from "../types";
import { baseSchema } from "./baseValidator";

export function validateRunRequest(format: RunEntry) {
  const schema = baseSchema.append({
    gogc: Joi.string().allow("").optional(),
    godebug: Joi.string().allow("").optional(),
    buildFlags: Joi.string().allow("").optional(),
  });

  return schema.validate(format);
}
