"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests/endpoints'],
    testMatch: ['**/*.test.ts'],
    clearMocks: true,
    testTimeout: 60000,
    maxWorkers: 1,
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map