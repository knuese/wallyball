const config = require('eslint-config-standard-typescript-prettier/prettier')

module.exports = {
  ...config,
  trailingComma: 'none',
  tabWidth: 2,
  semi: false,
  singleQuote: true
}
