// GULP REQUIRES
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

// PATHS
var paths = {
    css: 'user/themes/matt/src/css/**/*.scss',
    cssOut: 'user/themes/matt/assets/css/',
    js: 'user/themes/matt/src/js/**/*.js',
    jsOut: 'user/themes/matt/assets/js/'
};

// BROWSER SYNC
gulp.task('browser-sync', function() {
  browserSync.init({
    reloadDelay: 50,
    // server: { baseDir: "~/Repos/" } /* static files */
    proxy: 'site.test'
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

// CSS TASK
gulp.task('css', function () {
  gulp.src(paths.css)
    .pipe(sass())
    .on('error', gutil.log)
    .pipe(prefix('last 3 versions'))
    .on('error', gutil.log)
    .pipe(gulp.dest(paths.cssOut))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest(paths.cssOut))
    .pipe(reload({ stream: true }));
});

// JS TASK
gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(concat('main.js'))
    .on('error', gutil.log)
    .pipe(gulp.dest(paths.jsOut))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(gulp.dest(paths.jsOut))
    .pipe(reload({stream:true}))
});

// WATCH
gulp.task('default', ['browser-sync'], function () {
  gulp.watch(paths.css, ['css', 'bs-reload']);
  gulp.watch(paths.js, ['js', 'bs-reload']);
  gulp.watch(['user/themes/matt/templates/**/*.twig'], ['bs-reload']);
  gulp.watch(['user/pages/**/*.md'], ['bs-reload']);
});