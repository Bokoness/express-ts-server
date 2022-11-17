module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": "warn",
    "no-debugger": "warn",
    semi: [1, "never"],
    indent: [1, 2]
  },
}
