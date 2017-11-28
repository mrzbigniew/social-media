const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const copy = require('gulp-copy');
const ngAnnotate = require('gulp-ng-annotate')
const sourceMaps = require('gulp-sourcemaps');
const stylus = require('gulp-stylus');
const sass = require('gulp-sass');
const less = require('gulp-less');


gulp.task('js', function () {
    gulp.src(
        [
            'src/app/app.js',
            'src/app/**/*.js'
        ]
    )
        .pipe(sourceMaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('dist'))
});

gulp.task('html', function () {
    gulp.src(['src/app/**/*.html'])
        .pipe(gulp.dest('dist/'))
});

gulp.task('stylus', function(){
    gulp.src(['src/app/**/*.styl'])
        .pipe(stylus())
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function(){
    gulp.src(['src/app/**/*.sass'])
        .pipe(sass())
        .pipe(gulp.dest('dist'));
});

gulp.task('less', function(){
    gulp.src(['src/app/**/*.less'])
        .pipe(sass())
        .pipe(gulp.dest('dist'));
});

gulp.task('compile',['html','js','stylus','sass','less']);

gulp.task('watch', ['compile'], function () {
    const watch = gulp.watch("./src/app/**/*", ['compile']);
    watch.on('change', function (ev) {
        console.log('File ' + ev.path + ' was ' + ev.type + ', running task...');
    });
});


