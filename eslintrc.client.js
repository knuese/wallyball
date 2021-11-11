module.exports = {
  env: {
    node: false,
    commonjs: true,
    es2021: true,
    jest: true
  },
  extends: [
    'standard-typescript-prettier'
  ],
  parserOptions: {
    project: 'tsconfig.client.json',
    ecmaVersion: 12
  },
  rules: {
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-decline": "off"
  }
}