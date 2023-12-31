
require = require('esm')(module);
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev2');
const imagemin = require('gulp-imagemin');
const del = require('del');

const uglify = require('gulp-uglify-es').default;


gulp.task('css', function() {
  console.log('Minifying CSS...');

  gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'));

  return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});



gulp.task('js', function(done){
  console.log('minifying js...');
   gulp.src('./assets/**/*.js')
  .pipe(uglify())
  .pipe(rev())
  .pipe(gulp.dest('./public/assets'))
  .pipe(rev.manifest({
      cwd: 'public',
      merge: true
  }))
  .pipe(gulp.dest('./public/assets'));
  done()
});


  gulp.task('images', function (done) {
    console.log('Compressing images...');
    // we have used "regex" (regular expression) below
    gulp
      .src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
      .pipe(imagemin())
      .pipe(rev())
      .pipe(gulp.dest('./public/assets'))
      .pipe(
        rev.manifest({
          cwd: 'public',
          merge: true
        })
      )
      .pipe(gulp.dest('./public/assets'));
    done();
  });


// empty the public/assets directory
gulp.task('clean:assets', function(done){
  del.sync('./public/assets');
  done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
  console.log('Building assets');
  done();
});















