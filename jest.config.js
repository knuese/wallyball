const { defaults } = require('jest-config')

module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
      diagnostics: false
    }
  },
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js|jsx)'],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    ...defaults.coveragePathIgnorePatterns,
    'enum',
    '__test_data__'
  ]
}
