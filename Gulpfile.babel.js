import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('demo', function (){
  console.log('This is a gulp demo task.');
});

gulp.task('watch', () => {
    
    })

gulp.task('default', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({ presets: ['es2015', 'stage-0'] }))
        .pipe(gulp.dest('dist/'));
})