import path from "path";
import {
  BuildCommand,
  EnvEntry,
  objDumpCommand,
  RunCommand,
  TestCommand,
} from "../types";

const getFileName = (filePath: string): string => {
  const file_parts = path.parse(filePath);
  return file_parts.name + file_parts.ext;
};

let dockerBaseCommand = "docker run --rm";
const dockerWorkDir = "-w /go/src/app";
const volumeForSourceCode = (filePath: string, file: string) => {
  return `-v ${filePath}:/go/src/app/${file}`;
};
const preventNetworking = "--network none";
const cpuLimit = `--cpus="1"`;
const memoryLimit = "--memory=250m";
const limits = `${preventNetworking} ${cpuLimit} ${memoryLimit}`;
dockerBaseCommand += ` ${limits}`;
const volumeForGoModules = '-v "$PWD/go-modules":/go/pkg/mod';
const golangImage = (version: string) => {
  return `golang:${version}`;
};

export const envInfo = (version: string) => {
  return `${dockerBaseCommand} ${golangImage(
    version
  )} bash -c "echo '====Go ENVS====';go env && echo '\n====CPU ARCH===='; lscpu"`;
};

export const formatCode = (filePath: string, version: string) => {
  const file = getFileName(filePath);
  return `${dockerBaseCommand} ${volumeForSourceCode(
    filePath,
    file
  )} ${dockerWorkDir} ${golangImage(version)} gofmt -w ${file}`;
};

export const lintCode = (filePath: string, version: string) => {
  const file = getFileName(filePath);
  return `${dockerBaseCommand} ${volumeForSourceCode(
    filePath,
    file
  )} ${dockerWorkDir} ${golangImage(version)} go vet ${file}`;
};

const createEnvs = (envEntries: EnvEntry): string => {
  let envs = "";
  for (const [key, value] of Object.entries(envEntries)) {
    if (value.trim()) {
      envs += `--env ${key.toUpperCase()}=${value} `;
    }
  }
  return envs.trim();
};

export const buildCode = (filePath: string, config: BuildCommand) => {
  const { goos, goarch, gogc, godebug, buildFlags, version } = config;
  const file = getFileName(filePath);
  const inputEnvs = { goos, goarch, gogc, godebug };
  const envs = createEnvs(inputEnvs);
  const buildCommandWithTime = `TIMEFORMAT=%R;time go build -o x.exe ${buildFlags} ${file}`;
  const getBinarySize = "ls -sh x.exe | cut -d ' ' -f1";
  return `${dockerBaseCommand} ${volumeForSourceCode(
    filePath,
    file
  )} ${dockerWorkDir} ${volumeForGoModules} ${envs} ${golangImage(
    version
  )} bash -c "${buildCommandWithTime} 2>&1;${getBinarySize}"`;
};

export const objDump = (filePath: string, config: objDumpCommand) => {
  const { goos, goarch, buildFlags, symregexp: symRegex, version } = config;
  let symregexp = "";
  if (symRegex) {
    symregexp = `-s ${symRegex}`;
  }
  const file = getFileName(filePath);
  const inputEnvs = { goos, goarch };
  const envs = createEnvs(inputEnvs);
  const buildCommand = `go build -o x.exe ${buildFlags} ${file}`;
  const executeObjDumpTool = `go tool objdump ${symregexp} x.exe`;
  return `${dockerBaseCommand} ${volumeForSourceCode(
    filePath,
    file
  )} ${dockerWorkDir} ${volumeForGoModules} ${envs} ${golangImage(
    version
  )} bash -c "${buildCommand} && ${executeObjDumpTool}"`;
};

export const runCode = (filePath: string, config: RunCommand) => {
  const { gogc, godebug, buildFlags, version } = config;
  const file = getFileName(filePath);
  const inputEnvs = { gogc, godebug };
  const envs = createEnvs(inputEnvs);
  const buildCommand = `go build -o x.exe ${buildFlags} ${file}`;
  const executeProgramWithTime = "time ./x.exe";
  return `${dockerBaseCommand} ${volumeForSourceCode(
    filePath,
    file
  )} ${dockerWorkDir} ${volumeForGoModules} ${envs} ${golangImage(
    version
  )} bash -c "TIMEFORMAT=%R; ${buildCommand} && ${executeProgramWithTime}"`;
};

export const testCode = (filePath: string, config: TestCommand) => {
  const { gogc, godebug, buildFlags, testFlags, version } = config;
  const file = getFileName(filePath);
  const inputEnvs = { gogc, godebug };
  let envs = createEnvs(inputEnvs);
  envs += "--env GO111MODULE=auto";
  const testingCommand = `go test ${buildFlags} ${testFlags}`;
  return `${dockerBaseCommand} ${volumeForSourceCode(
    filePath,
    file
  )} ${dockerWorkDir} ${volumeForGoModules} ${envs} ${golangImage(
    version
  )} bash -c "go build ${buildFlags} ${file} && ${testingCommand};exit 0"`;
};
