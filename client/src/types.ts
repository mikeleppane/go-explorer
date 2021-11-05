import * as React from "react";

export interface ICodeOutputViewProps {
  setPaneSize: React.Dispatch<React.SetStateAction<string>>;
}

export interface BuildCodeParams {
  code: string;
  goarch?: string;
  goos?: string;
  gogc?: string;
  godebug?: string;
  buildFlags?: string;
  symregexp?: string;
  version?: string;
}

export interface RunCodeParams {
  code: string;
  gogc?: string;
  godebug?: string;
  buildFlags?: string;
  version?: string;
}

export interface TestCodeParams {
  code: string;
  gogc?: string;
  godebug?: string;
  buildFlags?: string;
  testFlags?: string;
  version?: string;
}

export interface CodeParams {
  code: string;
  version?: string;
}
