
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
    scripts: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/angular/angular.min.js',
        'assets/semantic/dist/semantic.min.js',
        'assets/js/vendor/*.js',
        'assets/js/dev/*.js'
    ],
    styles: [
        'assets/semantic/dist/semantic.min.css',
        'assets/css/vendor/*.css',
        'assets/css/dev/*.css'
    ]
};

// Removes existing scripts and stylesheets.
gulp.task('clean', function(cb) {
    del(['public/assets/*.js', 'public/assets/*.css'], cb);
});

// Minifies and hashes scripts.
gulp.task('scripts', /*['clean'],*/ function() {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
            .pipe(minifyJS())
            .pipe(combine('learn.js'))
        .pipe(sourcemaps.write())
        .pipe(rev())
        .pipe(gulp.dest('public/assets'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('assets/js'));
});

// Minifies and hashes stylesheets.
gulp.task('styles', /*['clean'],*/ function() {
    return gulp.src(paths.styles)
        .pipe(stripCssComments())
        .pipe(sourcemaps.init())
            .pipe(minifyCSS())
            .pipe(combine('learn.css'))
        .pipe(sourcemaps.write())
        .pipe(rev())
        .pipe(gulp.dest('public/assets'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('assets/css'));
});

// Reruns the tasks when a file changes.
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['scripts', 'styles']);
