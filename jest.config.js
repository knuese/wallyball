const { defaults } = require('jest-config')

module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
      isolatedModules: true,
      diagnostics: false
    }
  },
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js|jsx)'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    ...defaults.coveragePathIgnorePatterns,
    'enum',
    '__test_data__',
    '__test_utils__',
    'index.ts'
  ],
  moduleNameMapper: {
    '.+\\.png$': '<rootDir>/__mocks__/png.ts'
  }
}
