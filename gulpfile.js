const fs = require('fs')
const argv = require('yargs').argv
const gulp = require('gulp')
const path = require('path')
const log = require('fancy-log')
const plumber = require('gulp-plumber')
const newer = require('gulp-newer')
const sourcemaps = require('gulp-sourcemaps')
const gulpif = require('gulp-if')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
var ts = require('gulp-typescript')
var tsProject = ts.createProject('tsconfig.json')

const babelRc = JSON.parse(fs.readFileSync(path.join(__dirname, '.babelrc'), 'utf-8'))

const build = (lib, opts) => 
  gulp.src('src/**/*.ts')
      .pipe(plumber({
        errorHandler(err) {
          log.error(err.stack)
        },
      }))
      .pipe(newer(lib))
      .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js
      .pipe(sourcemaps.write('.', { sourceRoot: '../src' }))
      .pipe(gulp.dest(lib))


gulp.task('build', () => 
  build('test', babelRc.env['production'])
)    

gulp.task('default', gulp.task('build'))

gulp.task(
  'watch',
  gulp.series('build', () => gulp.watch('src/**/*', gulp.task('build')))
)