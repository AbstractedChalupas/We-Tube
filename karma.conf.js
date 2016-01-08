// Karma configuration

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // testing frameworks to use
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser. order matters!
    files: [
      // angular source
      'client/lib/angular/angular.js',
      'client/lib/angular-route/angular-route.js',
      'client/lib/angular-mocks/angular-mocks.js',

      //io.source
      "http://localhost:8001/socket.io/socket.io.js",
      // our app code
      'client/services/*.js',
      'client/auth/*.js',
      'client/stream/*.js',
      'client/*.js',

      // our spec files 
      'specs/client/appControllerSpec.js',
      'specs/client/streamControllerSpec.js',
      'specs/client/servicesSpec.js',
      //need to add
      // 'specs/client/routingSpec.js'
    ],

    // test results reporter to use
    reporters: ['nyan','unicorn'],

    // start these browsers. PhantomJS will load up in the background
    browsers: ['PhantomJS'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // if true, Karma exits after running the tests.
    singleRun: true

  });
};
