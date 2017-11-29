'use strict'

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const less = require('gulp-less');
const sass = require('gulp-sass');

gulp.task('stylus', function () {
    gulp.src(['src/app/**/*.styl'])
        .pipe(stylus())
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    gulp.src(['src/app/**/*.sass'])
        .pipe(sass())
        .pipe(gulp.dest('dist'));
});

gulp.task('less', function () {
    gulp.src(['src/app/**/*.less'])
        .pipe(sass())
        .pipe(gulp.dest('dist'));
});

gulp.task('css',['stylus','less','sass']);
