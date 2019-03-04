
const gulp=require('gulp');
const sass=require('gulp-sass');
const sourcemaps=require('gulp-sourcemaps');
const watch=require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');


gulp.task('sass',  function(){
    return gulp.src('./sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle:'compact'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css/'))
});

gulp.task('watch',  function(){
    gulp.watch('./sass/**/*.scss', [sass])
});
