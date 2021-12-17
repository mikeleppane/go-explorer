import express from "express";

interface BaseEntry {
  code: string;
  version?: string;
}

export type FormatEntry = BaseEntry;

export interface EnvEntry {
  goarch?: string;
  goos?: string;
  gogc?: string;
  godebug?: string;
}

export interface RunEntry extends BaseEntry {
  gogc?: string;
  godebug?: string;
  buildFlags?: string;
}

export interface BuildEntry extends RunEntry {
  goarch?: string;
  goos?: string;
  symregexp?: string;
}

export interface TestingEntry extends RunEntry {
  testFlags?: string;
}

export interface CodeExecutionEntry {
  code: string;
  goarch: string;
  goos: string;
  gogc: string;
  godebug: string;
  buildFlags: string;
  testFlags: string;
  symregexp: string;
}

export interface CommandExecutorType {
  stdout: string | undefined;
  stderr: string | undefined;
}

export type RequestEntry = RunEntry | BuildEntry | TestingEntry;

export type CommandExecutorOutput = CommandExecutorType | undefined;

interface Task {
  code: string;
  tempFile: string;
  requestEntries: CodeExecutionEntry;
  version: string;
  res: express.Response;
  isObjectDumpRequested: boolean;
}

export type BuildTask = Omit<Task, "code">;

export type FormatTask = Omit<Task, "isObjectDumpRequested" | "requestEntries">;

export type LintTask = FormatTask;

export type RunTask = Omit<Task, "code" | "isObjectDumpRequested">;

export type TestingTask = RunTask;

interface Command {
  goos: string;
  goarch: string;
  gogc: string;
  godebug: string;
  buildFlags: string;
  testFlags: string;
  version: string;
  symregexp: string;
}

export type BuildCommand = Omit<Command, "symregexp" | "testFlags">;
export type objDumpCommand = Omit<Command, "testFlags" | "gogc" | "godebug">;
export type RunCommand = Omit<
  Command,
  "testFlags" | "goos" | "goarch" | "symregexp"
>;

export type TestCommand = Omit<Command, "goos" | "goarch" | "symregexp">;

export interface RouteException {
  tempFile: string;
  error: unknown;
  res: express.Response;
}
