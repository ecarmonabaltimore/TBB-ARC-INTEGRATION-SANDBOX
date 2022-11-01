import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  moduleFileExtensions: ['ts', 'js'],
  setupFiles: ['dotenv/config', './__mocks__/setupJestMock.ts'],
  transform: {
    '\\.ts$': 'ts-jest',
  },
  testMatch: ['**/__test__/**/*-spec.ts'],
  verbose: true,
  silent: true,
};

export default config;
