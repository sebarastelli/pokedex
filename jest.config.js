import path from 'path';

export default {
  setupFiles: [
    "<rootDir>/_test_/setupTests.js"
],
  testEnvironment: 'jsdom',
  verbose: true,
  rootDir: 'src',
  coverageDirectory: '../coverage/',
  testPathIgnorePatterns: ['/node_modules/', '.*fixture.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '.*fixture.js'],
  transform: {
    "^.+\\.js$": "babel-jest"
  }
};