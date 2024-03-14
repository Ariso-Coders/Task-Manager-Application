/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.tsx", "!src/**/*.test.tsx"],
  coverageReporters: ["json", "lcov", "text", "clover"],
  //cleanMocks: true,
};
