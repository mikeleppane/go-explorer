import path from "path";
import { EnvEntry } from "../types";

const getFileName = (filePath: string): string => {
  const file_parts = path.parse(filePath);
  return file_parts.name + file_parts.ext;
};

const dockerBaseCommand = "docker run --rm";
const dockerWorkDir = "-w /go/src/app";
const volumeForSourceCode = (filePath: string, file: string) => {
  return `-v ${filePath}:/go/src/app/${file}`;
};
const volumeForGoModules = '-v "$PWD/go-modules":/go/pkg/mod';
const golangImage = (version: string) => {
  return `golang:${version}`;
};

export const getEnvInfo = (version: string) => {
  return `${dockerBaseCommand} ${golangImage(
    version
  )} bash -c "echo '====GO ENVS====';go env && echo '\n====CPU ARCH===='; lscpu"`;
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

export const buildCode = (
  goos: string,
  goarch: string,
  gogc: string,
  godebug: string,
  buildOptions: string,
  filePath: string,
  version: string
) => {
  const file = getFileName(filePath);
  const inputEnvs = { goos, goarch, gogc, godebug };
  const envs = createEnvs(inputEnvs);
  const buildCommandWithTime = `TIMEFORMAT=%R;time go build -o x.exe ${buildOptions} ${file}`;
  const getBinarySize = "ls -sh x.exe | cut -d ' ' -f1";
  return `${dockerBaseCommand} ${volumeForSourceCode(
    filePath,
    file
  )} ${dockerWorkDir} ${volumeForGoModules} ${envs} ${golangImage(
    version
  )} bash -c "${buildCommandWithTime} 2>&1;${getBinarySize}"`;
};

export const getObjDump = (
  goos: string,
  goarch: string,
  buildOptions: string,
  symregexp: string,
  filePath: string,
  version: string
) => {
  if (symregexp) {
    symregexp = `-s ${symregexp}`;
  } else {
    symregexp = "";
  }
  const file = getFileName(filePath);
  const inputEnvs = { goos, goarch };
  const envs = createEnvs(inputEnvs);
  const buildCommand = `go build -o x.exe ${buildOptions} ${file}`;
  const executeObjDumpTool = `go tool objdump ${symregexp} x.exe`;
  return `${dockerBaseCommand} ${volumeForSourceCode(
    filePath,
    file
  )} ${dockerWorkDir} ${volumeForGoModules} ${envs} ${golangImage(
    version
  )} bash -c "${buildCommand} && ${executeObjDumpTool}"`;
};

export const runCode = (
  gogc: string,
  godebug: string,
  buildOptions: string,
  filePath: string,
  version: string
) => {
  const file = getFileName(filePath);
  const inputEnvs = { gogc, godebug };
  const envs = createEnvs(inputEnvs);
  const buildCommand = `go build -o x.exe ${buildOptions} ${file}`;
  const executeProgramWithTime = "time ./x.exe";
  return `${dockerBaseCommand} ${volumeForSourceCode(
    filePath,
    file
  )} ${dockerWorkDir} ${volumeForGoModules} ${envs} ${golangImage(
    version
  )} bash -c "TIMEFORMAT=%R; ${buildCommand} && ${executeProgramWithTime}"`;
};

export const testCode = (
  gogc: string,
  godebug: string,
  buildFlags: string,
  testFlags: string,
  filePath: string,
  version: string
) => {
  const file = getFileName(filePath);
  const inputEnvs = { gogc, godebug };
  let envs = createEnvs(inputEnvs);
  envs += "--env GO111MODULE=auto";
  const benchmarkCommand = `go test ${buildFlags} ${testFlags}`;
  return `${dockerBaseCommand} ${volumeForSourceCode(
    filePath,
    file
  )} ${dockerWorkDir} ${volumeForGoModules} ${envs} ${golangImage(
    version
  )} bash -c "${benchmarkCommand} 2>&1;exit 0"`;
};
