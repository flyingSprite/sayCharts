import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import connect from 'gulp-connect';

// import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import livereload from 'gulp-livereload';

import sourcemaps from 'gulp-sourcemaps';
import browserify from 'browserify';

import packages from './package.json';

gulp.task('demo', function (){
  console.log('This is a gulp demo task.');
});

gulp.task('connectDev', () => {

    connect.server({
        port: 8001,
        livereload: true
    });
});

gulp.task('build', () => {
    return browserify({entries: './src/index.js', debug: false})
            .transform('babelify', {presets: ['es2015', 'stage-0']})
            .bundle()
            .pipe(source( packages.name + '.all.min.js' ))
            .pipe(buffer())
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./dist'))
            .pipe(livereload());
});

gulp.task('scripts', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({ presets: ['es2015', 'stage-0'] }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('scripts-all', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({ presets: ['es2015', 'stage-0'] }))
        .pipe(uglify())
        .pipe(concat(packages.name + '.min.js'))
        .pipe(gulp.dest('dist/'));
});


gulp.task('bundle', ['scripts', 'scripts-all', 'connectDev'], () => {
  gulp.watch('src/**/*.js', () => {
    gulp.run('scripts');
  });
});

gulp.task('default', ['build', 'connectDev'], () => {
    gulp.watch('src/**/*.js', () => {
        gulp.run('build');
    });
});
