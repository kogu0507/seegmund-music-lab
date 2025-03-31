/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|(\.|/)(test|spec))\.(mjs|js)?$',
  moduleFileExtensions: ['mjs', 'js', 'json'],
  transform: {
    '^.+\.(mjs|js)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  //extensionsToTreatAsEsm: ['.mjs'],
};

module.exports = config;
