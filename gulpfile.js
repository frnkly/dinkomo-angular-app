
// What are these called?
var gulp = require('gulp');
var del = require('del');
var combine = require('gulp-concat');
var minifyJS = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var stripCssComments = require('gulp-strip-css-comments');
var sourcemaps = require('gulp-sourcemaps');
var rev = require('gulp-rev');

var paths = {
    scripts: ['assets/js/vendor/*.js', 'assets/js/dev/*.js'],
    styles: ['assets/css/vendor/*.css', 'assets/css/dev/*.css']
};

// This empties a directory?
gulp.task('clean', function(cb) {
    del(['assets/build/*.js', 'assets/build/*.css'], cb);
});

// Minify scripts.
gulp.task('scripts', ['clean'], function() {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
            .pipe(minifyJS())
            .pipe(combine('learn.js'))
        .pipe(sourcemaps.write())
        .pipe(rev())
        .pipe(gulp.dest('assets/build'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('app/assets'));
});

// Minify stylesheets.
gulp.task('styles', ['clean'], function() {
    return gulp.src(paths.styles)
        .pipe(stripCssComments())
        .pipe(sourcemaps.init())
            .pipe(minifyCSS())
            .pipe(combine('learn.css'))
        .pipe(sourcemaps.write())
        .pipe(rev())
        .pipe(gulp.dest('assets/build'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('app/assets'));
});

// Rerun the task when a file changes.
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['scripts', 'styles']);
