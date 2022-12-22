const { defaults } = require('jest-config')

module.exports = {
  testMatch: ['**/__tests__/**/*test.(ts|tsx|js|jsx)'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    ...defaults.coveragePathIgnorePatterns,
    'enum',
    '__test_data__',
    '__test_utils__',
    'index.ts',
    'src/config',
    'src/store/reducers/sample',
    'src/store/types'
  ],
  moduleNameMapper: {
    '.+\\.png$': '<rootDir>/__tests__/__mocks__/png.ts',
    '^react-tooltip$': '<rootDir>/__tests__/__mocks__/react-tooltip.ts',
    '^react-tooltip/dist/react-tooltip.css': '<rootDir>/__tests__/__mocks__/react-tooltip-css.ts'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}
