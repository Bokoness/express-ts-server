module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: [1, 'never'],
    indent: [2, 2],
    'class-methods-use-this': 0,
    'no-underscore-dangle': 0,
    'import/extensions': 0,
    'consistent-return': 0,
    "no-console": 0,
    "no-param-reassign": 0
  },
}
