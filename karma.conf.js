var webpackConfig = require('./webpack.test.config.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-chrome-launcher'),
      require('karma-jasmine'),
      require('karma-webpack')
    ],
    files: [
      'src/**/*.spec.ts'
    ],
    exclude: [],
    webpack: webpackConfig,
    preprocessors: {
      'src/**/*.spec.ts': ['webpack']
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--disable-gpu',
          // Without a remote debugging port, Google Chrome exits immediately.
          '--remote-debugging-port=9222',
        ],
      }
    },
    singleRun: false,
    concurrency: Infinity
  });
};
