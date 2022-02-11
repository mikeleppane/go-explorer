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

const dockerBaseCommand = "docker run --rm --security-opt=no-new-privileges";
const volumeForSourceCode = (filePath: string, file: string) => {
  return `-v ${filePath}:/go/src/app/${file}`;
};

const applyLimits = (cpuLimit = 1, network = "none") => {
  return `--cpus="${cpuLimit}" --network ${network}`;
};

const golangImage = (version: string) => {
  return `golang:${version}`;
};
const timeoutCommand = "timeout 60";

export const envInfo = (version: string) => {
  return `${dockerBaseCommand} ${applyLimits()} ${golangImage(
    version
  )} ${timeoutCommand} bash -c "echo '====Go ENVS====';go env && echo '\n====CPU ARCH===='; lscpu | grep -iE 'Architecture:|CPU op-mode\\(s\\):|CPU\\(s\\):|Thread\\(s\\) per core:|Core\\(s\\) per socket:|NUMA node\\(s\\):|Vendor ID:|CPU family:|Model:|Model name:|CPU MHz:|L1d cache:|L1i cache:|L2 cache:'"`;
};

export const formatCode = (filePath: string, version: string) => {
  const file = getFileName(filePath);
  return `${dockerBaseCommand} ${applyLimits()} ${volumeForSourceCode(
    filePath,
    file
  )} ${golangImage(version)} ${timeoutCommand} goimports ${file}`;
};

export const lintCode = (filePath: string, version: string) => {
  const file = getFileName(filePath);
  return `${dockerBaseCommand} ${applyLimits()} ${volumeForSourceCode(
    filePath,
    file
  )} ${golangImage(version)} ${timeoutCommand} go vet ${file}`;
};

const createEnvs = (envEntries: EnvEntry): string => {
  let envs = "";
  for (const [key, value] of Object.entries(envEntries)) {
    if (typeof value === "string" && value.trim()) {
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
  return `${dockerBaseCommand} ${applyLimits()} ${volumeForSourceCode(
    filePath,
    file
  )} ${envs} ${golangImage(
    version
  )} ${timeoutCommand} bash -c "${buildCommandWithTime} 2>&1;${getBinarySize}"`;
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
  return `${dockerBaseCommand} ${applyLimits()} ${volumeForSourceCode(
    filePath,
    file
  )} ${envs} ${golangImage(
    version
  )} ${timeoutCommand} bash -c "${buildCommand} && ${executeObjDumpTool}"`;
};

export const runCode = (filePath: string, config: RunCommand) => {
  const { gogc, godebug, buildFlags, version } = config;
  const file = getFileName(filePath);
  const inputEnvs = { gogc, godebug };
  const envs = createEnvs(inputEnvs);
  const buildCommand = `go build -o x.exe ${buildFlags} ${file}`;
  const executeProgramWithTime = "time ./x.exe";
  return `${dockerBaseCommand} ${applyLimits(0.5)} ${volumeForSourceCode(
    filePath,
    file
  )} ${envs} ${golangImage(
    version
  )} ${timeoutCommand} bash -c "TIMEFORMAT=%R; ${buildCommand} && ${executeProgramWithTime}"`;
};

export const testCode = (filePath: string, config: TestCommand) => {
  const { buildFlags, testFlags, version } = config;
  const file = getFileName(filePath);
  const inputEnvs = {};
  let envs = createEnvs(inputEnvs);
  envs += "--env GO111MODULE=auto";
  const testingCommand = `go test ${buildFlags} ${testFlags}`;
  return `${dockerBaseCommand} ${applyLimits(0.5)} ${volumeForSourceCode(
    filePath,
    file
  )} ${envs} ${golangImage(
    version
  )} ${timeoutCommand} bash -c "go build ${buildFlags} ${file} && ${testingCommand};exit 0"`;
};
