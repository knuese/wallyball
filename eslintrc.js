module.exports = {
  env: {
    node: false,
    commonjs: true,
    es2021: true,
    jest: true
  },
  extends: [
    'react-app',
    'react-app/jest',
    'standard-typescript-prettier'
  ],
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 12
  },
  rules: {
    "jsx-a11y/anchor-is-valid": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-decline": "off",
    "react-hooks/exhaustive-deps": "off"
  }
}