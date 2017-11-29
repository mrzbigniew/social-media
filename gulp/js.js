'use strict';

const gulp = require('gulp');
const sourceMaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');
const concat = require('gulp-concat');

gulp.task('js', function () {
    gulp.src(
        [
            'src/app/app.js',
            'src/app/routes.js',
            'src/app/**/*.js'
        ]
    )
        .pipe(sourceMaps.init())
        .pipe(concat('app.js'))
        .pipe(minify())
        .pipe(sourceMaps.write('./', {
            includeContent: true,
            sourceRoot: '/src/app'
        }))
        .pipe(gulp.dest('dist'))
});