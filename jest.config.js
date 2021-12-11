module.exports = {
  preset: "ts-jest",
  coverageDirectory: "coverage",
  coverageReporters: ["html", "lcov", "text"],
  collectCoverageFrom: ["src/**/*.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  rootDir: __dirname,
  testMatch: ["<rootDir>/__tests__/**/*test.ts"],
  globals: {
    __DEVELOPMENT__: true
  }
};
