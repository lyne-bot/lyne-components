const jestConfig = {
  collectCoverageFrom: ['src/**/*.tsx'],
  coverageThreshold: {
    global: {
      // Example: setting functions threshold to 50, and after test we reach
      // 30, the build will break
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  modulePaths: [
    'src',
    '/node_modules/'
  ],
  testMatch: '**/?(*.)+(spec|e2e).ts?(x)',
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/jestAssetsTransformer.js'
  },
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx|css)$': "@stencil/core/testing/jest-preprocessor"
  }

};

module.exports = jestConfig;
