module.exports = function (config) {
    config.set({
        frameworks: ['mocha', 'chai'],
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-route/angular-route.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/app/app.js',
            'src/app/**/*.js',
            'src/test/app/**/*.spec.js'
        ],
        // plugins: ['karma-mocha', 'karma-chai'],
        reporters: 'progress',
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['ChromeHeadless'],
        singleRun: true
    });
};
