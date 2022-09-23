import type { InitialOptionsTsJest } from "ts-jest";

const config: InitialOptionsTsJest = {
  preset: "ts-jest",
  coverageDirectory: "coverage",
  coverageReporters: ["html", "lcov", "text"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  moduleNameMapper: {},
  testMatch: ["<rootDir>/__tests__/**/*test.ts"],
  globals: {
    __DEVELOPMENT__: false,
    "ts-jest": {
      tsconfig: {
        types: ["jest", "node"],
      },
    },
  },
};

export function createConfig(
  rootDir: string,
  displayName: string
): InitialOptionsTsJest {
  return {
    ...config,
    rootDir,
    displayName,
  };
}
