module.exports = {
  setupFiles: ['dotenv/config'],
  roots: ['<rootDir>/tests'],
  collectCoverageFrom: ['**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  transform: {
    '\\.ts$': 'ts-jest',
  },
  clearMocks: true,
  testTimeout: 30000,
  modulePathIgnorePatterns: [],
  moduleNameMapper: {
    '^@application(.*)$': '<rootDir>/src/application/$1',
    '^@domain(.*)$': '<rootDir>/src/domain/$1',
    '^@infra(.*)$': '<rootDir>/src/infra/$1',
    '^@config(.*)$': '<rootDir>/src/config/$1',
  },
};
