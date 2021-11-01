export interface FormatEntry {
  code: string;
  version?: string;
}

type buildOptionType = {
  [key: string]: string;
};

type testingOptionType = {
  [key: string]: string;
};

export interface EnvEntry {
  goarch?: string;
  goos?: string;
  gogc?: string;
  godebug?: string;
}

export interface BuildEntry {
  code: string;
  goarch?: string;
  goos?: string;
  gogc?: string;
  godebug?: string;
  buildOptions?: buildOptionType;
  symregexp?: string;
  version?: string;
}

export interface RunEntry {
  code: string;
  gogc?: string;
  godebug?: string;
  buildOptions?: buildOptionType;
  version?: string;
}

export interface TestingEntry {
  code: string;
  gogc?: string;
  godebug?: string;
  buildOptions?: buildOptionType;
  testingOptions?: testingOptionType;
  version?: string;
}

export interface CommandExecutorType {
  stdout: string | undefined;
  stderr: string | undefined;
}

export type RequestEntries = RunEntry | BuildEntry | TestingEntry;

export type CommandOutput = CommandExecutorType | undefined;
