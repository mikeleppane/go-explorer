export interface FormatEntry {
  code: string;
  version?: string;
}

type buildOptionType = {
  [key: string]: string;
};

export interface BuildEntry {
  code: string;
  goarch?: string;
  goos?: string;
  buildOptions?: buildOptionType;
  symregexp?: string;
  version?: string;
}

export interface ProcessExecutorType {
  stdout: string | undefined;
  stderr: string | undefined;
}
