/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  //cleanMocks: true,
};
