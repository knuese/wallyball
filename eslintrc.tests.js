module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true
  },
  extends: [
    'standard-typescript-prettier'
  ],
  parserOptions: {
    project: '__tests__/tsconfig.json',
    ecmaVersion: 12
  },
  rules: {
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-decline": "off"
  }
}