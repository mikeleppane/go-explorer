import dotenv from "dotenv";

dotenv.config();

let versions: string[] = [];
if (process.env.GOLANG_VERSIONS) {
  versions = process.env.GOLANG_VERSIONS.split(";");
}
export const availableVersions = versions;

// take the last item of the sorted list of version after
// removing rc or beta tagged versions
export const fallBackVersion =
  versions
    .filter((version) => !version.includes("rc") && !version.includes("beta"))
    .sort()
    .slice(-1)[0] || "";

export const isValidVersion = (version: string): boolean => {
  return Boolean(version && versions.find((item) => item === version));
};
