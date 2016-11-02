var gulp = require('gulp');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

		gulp.watch("src/**/*.js", ['browserify']);
    gulp.watch("./index.html").on('change', browserSync.reload);
});

gulp.task('browserify', function() {
	gulp.src('./src/app.js')
		.pipe(browserify())
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.stream());
});

gulp.task('build_release', function() {
  gulp.src("./index.html").pipe(gulp.dest("./build"));
  gulp.src("./css/*").pipe(gulp.dest("./build/css"));
  gulp.src("./assets/*").pipe(gulp.dest("./build/assets"));
  gulp.src("./dist/*").pipe(gulp.dest("./build/dist"));

  gulp.src('./src/app.js')
    .pipe(browserify())
    .pipe(gulp.dest('./build/dist'));
});

gulp.task('default', ['serve']);
