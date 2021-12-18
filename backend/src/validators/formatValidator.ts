import { FormatEntry } from "../types";
import { baseSchema } from "./baseValidator";

export function validateFormatRequest(format: FormatEntry) {
  return baseSchema.validate(format);
}
