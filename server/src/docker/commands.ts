import path from "path";

export const getEnvInfo = (version: string): string => {
  return `docker run --rm golang:${version} go env`;
};

export const formatCode = (fileName: string, version: string): string => {
  const file_parts = path.parse(fileName);
  const file = file_parts.name + file_parts.ext;
  return `docker run --rm -v ${fileName}:/app/${file} -w /app golang:${version} gofmt -w ${file}`;
};
