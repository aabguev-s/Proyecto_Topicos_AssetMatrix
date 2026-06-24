import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests/endpoints'],
  testMatch: ['**/*.test.ts'],
  clearMocks: true,
  testTimeout: 60000,
  maxWorkers: 1,
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};

export default config;
