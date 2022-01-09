/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["./src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
