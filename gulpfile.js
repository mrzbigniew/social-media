'use strict'

const gulp = require('gulp');
const fs = require('fs');

fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
    require('./gulp/' + task);
});

gulp.task('watch:all',['html', 'js', 'css'],function(){
    gulp.watch('./src/app/**/*.*',{
        interval : 200,
        persistent: true,
        ignoreInitial: true,
    },['html', 'js', 'css']);
});

gulp.task('dev', ['watch:all','dev:server']);
