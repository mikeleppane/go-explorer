export class BaseError extends Error {
  public readonly name: string;
  public readonly isOperational: boolean;

  constructor(name: string, description: string, isOperational: boolean) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

export class TempFileCreationError extends BaseError {
  constructor(description: string) {
    super("Temp File Creation Error", description, true);
  }
}

export class CommandExecutionError extends BaseError {
  constructor(description: string) {
    super("Command Execution Error", description, true);
  }
}

export class VersionQueryValidationError extends BaseError {
  constructor(description: string) {
    super("Golang Version Validation Error", description, true);
  }
}
