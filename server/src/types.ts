export interface FormatEntry {
  code: string;
  version?: string;
}

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
  buildFlags?: string;
  symregexp?: string;
  version?: string;
}

export interface RunEntry {
  code: string;
  gogc?: string;
  godebug?: string;
  buildFlags?: string;
  version?: string;
}

export interface TestingEntry {
  code: string;
  gogc?: string;
  godebug?: string;
  buildFlags?: string;
  testFlags?: string;
  version?: string;
}

export interface CommandExecutorType {
  stdout: string | undefined;
  stderr: string | undefined;
}

export type RequestEntries = RunEntry | BuildEntry | TestingEntry;

export type CommandOutput = CommandExecutorType | undefined;
