const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del')

gulp.task('babel', function () {
  return gulp.src(['src/**/*.jsx', 'src/**/*.js', 'src/**/*.ts', 'src/**/*.tsx']).
    pipe(babel({
      plugins: ['transform-react-jsx'],
      presets: ['@babel/preset-env']
    })).
    pipe(gulp.dest('lib/'))
});
gulp.task('copy',  function() {
  return gulp.src('src/**/*.less')
    .pipe(gulp.dest('lib'))
});
gulp.task('del', function() {
  return del([
    'lib/**'
  ])
})
gulp.task('default',gulp.series('del', gulp.parallel('babel', 'copy')));