import path from "path";

export const getEnvInfo = (version: string): string => {
  return `docker run --rm golang:${version} go env`;
};

export const formatCode = (fileName: string, version: string): string => {
  const file_parts = path.parse(fileName);
  const file = file_parts.name + file_parts.ext;
  return `docker run --rm -v ${fileName}:/app/${file} -w /app golang:${version} gofmt -w ${file}`;
};

export const lintCode = (fileName: string, version: string): string => {
  const file_parts = path.parse(fileName);
  const file = file_parts.name + file_parts.ext;
  return `docker run --rm -v ${fileName}:/app/${file} -w /app golang:${version} go vet ${file}`;
};

export const buildCode = (
  goos = "linux",
  goarch = "amd64",
  gcflags = "",
  fileName: string,
  version: string
): string => {
  const file_parts = path.parse(fileName);
  const file = file_parts.name + file_parts.ext;
  if (gcflags) {
    gcflags = `-gcflags ${gcflags}`;
  }
  return `docker run --rm -v ${fileName}:/app/${file} -w /app \
  --env GOOS=${goos} --env GOARCH=${goarch} golang:${version} \
  bash -c "TIMEFORMAT=%R;time go build ${gcflags} ${file} 2>&1"`;
};

export const getObjDump = (
  goos = "linux",
  goarch = "amd64",
  gcflags = "",
  fileName: string,
  version: string
): string => {
  const file_parts = path.parse(fileName);
  const file = file_parts.name + file_parts.ext;
  return `docker run --rm -v ${fileName}:/app/${file} -w /app golang:${version}
   GOOS=${goos} GOARCH=${goarch} go build -o x.exe -gcflags ${gcflags} ${file} \
   && go tool objdump x.exe`;
};
