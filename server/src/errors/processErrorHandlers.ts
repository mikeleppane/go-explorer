import logger from "../utils/logging";
import { BaseError } from "./errorTypes";

export const registerUnexpectedErrorHandlers = () => {
  process.on(
    "unhandledRejection",
    (reason: Error, _promise: Promise<unknown>) => {
      throw reason;
    }
  );

  process.on("uncaughtException", (error) => {
    logger.error(error);
    if (!(error instanceof BaseError)) {
      process.exit(1);
    }
  });
};
