module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    'cypress/globals': true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:chai-friendly/recommended',
  ],
  plugins: ['cypress', 'chai-friendly'],
  // add your custom rules here
  rules: {
    'no-console': 'off',
  },
}
