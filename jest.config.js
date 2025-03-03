/** @type {import('jest').Config} */

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": ["ts-jest", {}]
  },
  moduleFileExtensions: ["ts", "js"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
};
