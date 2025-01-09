import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: [
    "<rootDir>/src/app/components/*.{js,jsx}",
    "!<rootDir>/node_modules/",
  ], // Specify files for coverage
  coverageReporters: ["text", "lcov"], // Include terminal and HTML reports
  coverageDirectory: "coverage", // Output directory for coverage files

  // Add the reporters configuration
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./reports/junit",
        outputName: "junit.xml",
      },
    ],
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
