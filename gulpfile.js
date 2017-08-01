
const gulp = require('gulp');
const gulpLess = require('gulp-less');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');


gulp.task('style',()=>{
    //执行任务
    return gulp.src(['./app/css/*.scss','!./app/css/_demo.scss'])
        .pipe(sass()).pipe(cssnano()).pipe(gulp.dest('./dist/styles'))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('devStyle',()=>{
    //执行任务
    return gulp.src(['./app/css/*.scss','!./app/css/_demo.scss'])
        .pipe(sass()).pipe(gulp.dest('./app/styles'))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('script',()=>{
    return gulp.src('./app/scripts/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts'))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('devScript',()=>{
    return gulp.src('./app/scripts/*.js')
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('image',()=>{
    return gulp.src('./app/images/*.{jpg,png}')
        .pipe(gulp.dest('./dist/images'))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('devImage',()=>{
    return gulp.src('./app/images/*.{jpg,png}')
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('html',()=>{
    return gulp.src('./app/index.html')
        .pipe(htmlmin({collapseWhitespace:true}))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('devHtml',()=>{
    return gulp.src('./app/index.html')
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('run',()=>{
    browserSync({
        server:{
            baseDir: ['dist'],
            proxy: "http://localhost:3306"
        }
    });
    gulp.watch('./app/css/*.scss',['style']);
    gulp.watch('./app/scripts/*.js',['script']);
    gulp.watch('./app/images/*.{png,jpg}',['image']);
    gulp.watch('./app/index.html',['html']);
});
gulp.task('devRun',()=>{
    browserSync({
        server:{
            baseDir: ['app'],
            proxy: "http://localhost:3306"
        }
    });
    gulp.watch('./app/css/*.scss',['devStyle']);
    gulp.watch('./app/scripts/*.js',['devScript']);
    gulp.watch('./app/images/*.{png,jpg}',['devImage']);
    gulp.watch('./app/index.html',['devHtml']);
});
gulp.task('prod', ['style', 'script', 'image', 'html', 'run']);
gulp.task('dev', ['devStyle', 'devRun']);