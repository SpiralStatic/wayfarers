var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('build-less', function(){
    return gulp.src('./less/master.less')
        .pipe(less())
        .pipe(gulp.dest('../public/css/'));
});

gulp.task('default', ['build-less']);
