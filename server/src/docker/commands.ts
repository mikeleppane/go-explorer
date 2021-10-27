import path from "path";

export const getEnvInfo = (version: string): string => {
  return `docker run --rm golang:${version} go env`;
};

export const formatCode = (fileName: string, version: string): string => {
  const file_parts = path.parse(fileName);
  const file = file_parts.name + file_parts.ext;
  return `docker run --rm -v ${fileName}:/go/src/app/${file} -w /go/src/app \
  golang:${version} gofmt -w ${file}`;
};

export const lintCode = (fileName: string, version: string): string => {
  const file_parts = path.parse(fileName);
  const file = file_parts.name + file_parts.ext;
  return `docker run --rm -v ${fileName}:/go/src/app/${file} -w /go/src/app \
  golang:${version} go vet ${file}`;
};

export const buildCode = (
  goos = "linux",
  goarch = "amd64",
  buildOptions = "",
  fileName: string,
  version: string
): string => {
  const file_parts = path.parse(fileName);
  const file = file_parts.name + file_parts.ext;
  return `docker run --rm -v ${fileName}:/go/src/app/${file} -w /go/src/app \
  -v "$PWD/go-modules":/go/pkg/mod \
  --env GOOS=${goos} --env GOARCH=${goarch} golang:${version} \
  bash -c "TIMEFORMAT=%R;time go build -o x.exe \
  ${buildOptions} ${file} 2>&1;ls -sh x.exe | cut -d ' ' -f1"`;
};

export const getObjDump = (
  goos = "linux",
  goarch = "amd64",
  buildOptions = "",
  symregexp = "main.main",
  fileName: string,
  version: string
): string => {
  const file_parts = path.parse(fileName);
  const file = file_parts.name + file_parts.ext;
  if (symregexp) {
    symregexp = `-s ${symregexp}`;
  } else {
    symregexp = "";
  }
  return `docker run --rm -v ${fileName}:/app/${file} -w /app \
  -v "$PWD/go-modules":/go/pkg/mod --env GOOS=${goos} --env GOARCH=${goarch} \
  golang:${version} bash -c "go build -o x.exe \
  ${buildOptions} ${file} && go tool objdump ${symregexp} x.exe"`;
};

export const runCode = (
  goos = "linux",
  goarch = "amd64",
  buildOptions = "",
  fileName: string,
  version: string
): string => {
  const file_parts = path.parse(fileName);
  const file = file_parts.name + file_parts.ext;
  return `docker run --rm -v ${fileName}:/go/src/app/${file} -w /go/src/app \
  -v "$PWD/go-modules":/go/pkg/mod \
  --env GOOS=${goos} --env GOARCH=${goarch} golang:${version} \
  bash -c "TIMEFORMAT=%R; go build -o x.exe ${buildOptions} ${file} && time ./x.exe 2>&1"`;
};
