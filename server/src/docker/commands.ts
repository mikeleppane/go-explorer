import path from "path";

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
  return `${dockerBaseCommand} ${golangImage(version)} go env`;
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

export const buildCode = (
  goos: string,
  goarch: string,
  buildOptions: string,
  filePath: string,
  version: string
) => {
  const file = getFileName(filePath);
  const envs = `--env GOOS=${goos} --env GOARCH=${goarch}`;
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
  goos = "linux",
  goarch = "amd64",
  buildOptions = "",
  symregexp = "main.main",
  filePath: string,
  version: string
) => {
  if (symregexp) {
    symregexp = `-s ${symregexp}`;
  } else {
    symregexp = "";
  }
  const file = getFileName(filePath);
  const envs = `--env GOOS=${goos} --env GOARCH=${goarch}`;
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
  goos = "linux",
  goarch = "amd64",
  buildOptions = "",
  filePath: string,
  version: string
) => {
  const file = getFileName(filePath);
  const envs = `--env GOOS=${goos} --env GOARCH=${goarch}`;
  const buildCommand = `go build -o x.exe ${buildOptions} ${file}`;
  const executeProgramWithTime = "time ./x.exe 2>&1";
  return `${dockerBaseCommand} ${volumeForSourceCode(
    filePath,
    file
  )} ${dockerWorkDir} ${volumeForGoModules} ${envs} ${golangImage(
    version
  )} bash -c "TIMEFORMAT=%R; ${buildCommand} && ${executeProgramWithTime}"`;
};
