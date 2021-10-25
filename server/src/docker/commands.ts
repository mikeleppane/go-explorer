export const getEnvInfo = (version: string): string => {
  return `docker run --rm golang:${version} go env`;
};
