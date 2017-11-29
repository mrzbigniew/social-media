'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('dev:server', function(){
    nodemon({
        script: './src/server/server.js',
        ext: 'js',
        ignore : ['gulp*','dist*']
    });
});
