exports.config = {
    framework : 'mocha',
    specs: [
        './src/test/e2e/**/*.spec.js'
    ],
    mochaOpts: {
        reporter: 'spec',
        slow: 3000
    }
}
