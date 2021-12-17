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

export interface BuildTask {
  tempFile: string;
  requestEntries: CodeExecutionEntry;
  version: string;
  res: express.Response;
  isObjectDumpRequested: boolean;
}

export interface FormatTask {
  tempFile: string;
  code: string;
  version: string;
  res: express.Response;
}

export type LintTask = FormatTask;

export interface RunTask {
  tempFile: string;
  requestEntries: CodeExecutionEntry;
  version: string;
  res: express.Response;
}

export type TestingTask = RunTask;

export interface RouteException {
  tempFile: string;
  error: unknown;
  res: express.Response;
}
