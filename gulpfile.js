
// What are these called?
var gulp = require('gulp');
var del = require('del');
var combine = require('gulp-concat');
var minifyJS = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var stripCssComments = require('gulp-strip-css-comments');
var sourcemaps = require('gulp-sourcemaps');
var rev = require('gulp-rev');

//
// CSS
//////////////////////

// Paths to CSS files.
var css = {
    dev: ['assets/css/vendor/*.css', 'assets/css/dev/*.css'],
    dependencies: ['assets/semantic/dist/semantic.min.css']
};

// Removes existing stylesheets.
gulp.task('remove-css', function(done) {
    del('public/assets/*.css');
    done();
});

// Combines and minifies dev CSS files.
gulp.task('minify-css', function() {
    return gulp.src(css.dev)
        .pipe(stripCssComments())
        .pipe(sourcemaps.init())
            .pipe(minifyCSS())
            .pipe(combine('learn.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/css/build'));
});

// Combines all CSS files.
gulp.task('css', ['remove-css', 'minify-css'], function() {
    return gulp.src(css.dependencies.concat('assets/css/build/learn.css'))
        .pipe(sourcemaps.init())
            .pipe(combine('learn.css'))
            .pipe(rev())
            .pipe(gulp.dest('public/assets'))
        .pipe(sourcemaps.write('./'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('assets/css'));
});


var paths = {
    css: [
        'assets/semantic/dist/semantic.min.css',
        'assets/css/vendor/*.css',
        'assets/css/dev/*.css'
    ],
    js: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/angular/angular.min.js',
        'assets/semantic/dist/semantic.min.js',
        'assets/js/vendor/*.js',
        'assets/js/dev/*.js'
    ]
};

// Removes existing scripts and stylesheets.
gulp.task('delete-js-rev', function(done) {
    del('public/assets/*.js');
    done();
});
gulp.task('clean', ['remove-css', 'remove-js']);

// Minifies and hashes scripts.
gulp.task('js', ['delete-js-rev'], function() {
    return gulp.src(paths.js)
        .pipe(sourcemaps.init())
            .pipe(minifyJS())
            .pipe(combine('learn.js'))
            .pipe(rev())
            .pipe(gulp.dest('public/assets'))
        .pipe(sourcemaps.write('./'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('assets/js'));
});

// Reruns the tasks when a file changes.
gulp.task('watch', function() {
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.css, ['css']);
});

gulp.task('default', ['css', 'js']);
