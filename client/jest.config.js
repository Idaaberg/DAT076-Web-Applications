/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jest-fixed-jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    "\\.(css|less|sass|scss|jpg)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
  },
};