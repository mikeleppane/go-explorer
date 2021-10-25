export const availableVersions = ["1.17", "1.16"];

export const fallBackVersion = "1.17";

export const isValidVersion = (version: string): boolean => {
  return Boolean(version && availableVersions.find((item) => item === version));
};
