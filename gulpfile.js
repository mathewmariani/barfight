var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('browserify', function() {
	gulp.src('./src/app.js')
		.pipe(browserify())
	.pipe(gulp.dest('./dist'))
});

gulp.task('default', ['browserify']);
