import dotenv from "dotenv";

dotenv.config();

let versions: string[] = [];
if (process.env.GOLANG_VERSIONS) {
  versions = process.env.GOLANG_VERSIONS.split(";");
}
export const availableVersions = versions;

export const fallBackVersion = versions.sort()[versions.length - 1] || "";

export const isValidVersion = (version: string): boolean => {
  return Boolean(version && versions.find((item) => item === version));
};
