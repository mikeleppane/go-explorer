export interface FormatEntry {
  code: string;
  version?: string;
}

export interface BuildEntry {
  code: string;
  gcflags?: string;
  goarch?: string;
  goos?: string;
  version?: string;
}