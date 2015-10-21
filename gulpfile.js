
// What are these called?
var gulp = require('gulp'),
    del = require('del'),
    combine = require('gulp-concat'),

    minifyJS = require('gulp-uglify'),

    minifyCSS = require('gulp-minify-css'),
    stripCssComments = require('gulp-strip-css-comments'),

    sourcemaps = require('gulp-sourcemaps'),
    rev = require('gulp-rev');

//
// CSS
//////////////////////

// Paths to stylesheets.
var css = {
    dev: ['assets/css/vendor/*.css', 'assets/css/dev/*.css'],
    dependencies: [
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/font-awesome/css/font-awesome.min.css'
    ]
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

//
// JS
//////////////////////

// Paths to javascript files.
var js = {
    dev: ['assets/js/vendor/*.js', 'assets/js/dev/**/*.js'],
    dependencies: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/angular/angular.min.js',
        'node_modules/angular-route/angular-route.min.js',
        'node_modules/ngstorage/ngStorage.min.js'
    ]
};

// Removes existing javascript files.
gulp.task('remove-js', function(done) {
    del('public/assets/*.js');
    done();
});

// Combines and minifies dev javascript files.
gulp.task('minify-js', function() {
    return gulp.src(js.dev)
        .pipe(sourcemaps.init())
            .pipe(minifyJS())
            .pipe(combine('learn.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/js/build'));
});

// Combines all javascript files.
gulp.task('js', ['remove-js', 'minify-js'], function() {
    return gulp.src(js.dependencies.concat('assets/js/build/learn.js'))
        .pipe(sourcemaps.init())
            .pipe(combine('learn.js'))
            .pipe(rev())
            .pipe(gulp.dest('public/assets'))
        .pipe(sourcemaps.write('./'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('assets/js'));
});

//
// Other
//////////////////////

// Reruns the tasks when a file changes.
gulp.task('watch', function() {
    gulp.watch(css.dev, ['css']);
    gulp.watch(js.dev, ['js']);
});

gulp.task('default', ['css', 'js']);
