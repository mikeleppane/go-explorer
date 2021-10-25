export const getEnvInfo = (version: string): string => {
  return `docker run --rm golang:${version} go env`;
};

export const formatCode = (fileName: string, version: string): string => {
  return `docker run --rm golang:${version} gofmt -w ${fileName}`;
};
