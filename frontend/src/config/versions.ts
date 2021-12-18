export const availableVersions = () => {
  const versions = process.env.GOLANG_VERSIONS;
  if (versions) {
    return versions.split(";");
  }
  return ["1.17", "1.16"];
};
