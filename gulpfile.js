const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const min = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");


gulp.task('sass-compail', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css/'))
})


gulp.task('autoprefixer', function () {
    return gulp.src('./dist/css/main.css')

        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))

        .pipe(gulp.dest('./dist/css/'))
})

gulp.task('imagemin', function () {
    return gulp.src('./src/images/**/*')
        .pipe(newer('./dist/images/'))
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images/'))
});

gulp.task('min', function () {
    return gulp.src('./dist/css/main.css')

        .pipe(concat('min-main.css'))
        .pipe(min({
            level: 2
        }))

        .pipe(gulp.dest('./dist/css'))
})

gulp.task('watch', function () {
    gulp.watch(['./src/scss/*.scss', './src/scss/base/*.scss', './src/scss/components/*.scss', './src/scss/layout/*.scss',  './src/scss/pages/*.scss', './src/scss/utils/*.scss'], gulp.series('sass-compail'));
})

// , 'autoprefixer', 'min', 'imagemin'