'use strict'

const gulp = require('gulp');

gulp.task('html', function () {
    gulp.src(['src/app/**/*.html'])
        .pipe(gulp.dest('dist/'))
});