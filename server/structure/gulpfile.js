const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');

gulp.task('copy', function() {
  const folders = ['src/**/*.html', 'src/lib/**/*', 'src/**/*.png'];
  // folders.map(function(folder) {
  //  return gulp.src(folder)
  //             .pipe(gulp.dest('./dist/'));
  gulp.src(folders[0])
      .pipe(gulp.dest('./dist/'));

  gulp.src(folders[1])
      .pipe(gulp.dest('./dist/lib'));

  gulp.src(folders[2])
      .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', function() {
  return del.sync([
    './dist/**',
  ]);
});

gulp.task('build', ['clean', 'copy']);
