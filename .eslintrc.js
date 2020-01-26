module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true
  },
  extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier', 'jest'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off'
  }
};
