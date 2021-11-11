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
    project: './tsconfig.server.json',
    ecmaVersion: 12
  },
  rules: {}
}