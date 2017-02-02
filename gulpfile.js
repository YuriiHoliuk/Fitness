var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'assets'
        },
        notify: false
    });
});


// gulp.task('scripts', function() {
//     return gulp.src([])
//         .pipe(concat()) 
//         .pipe(uglify()) 
//         .pipe(gulp.dest('assets/js')); 
// });

gulp.task('watch', ['browser-sync', 'sass', 'html'], function() {
    gulp.watch('assets/scss/**/*.scss', ['sass', browserSync.reload]);
    gulp.watch('assets/**/*.html', ['html', browserSync.reload]);
    gulp.watch('assets/js/**/*.js', browserSync.reload);
});


gulp.task('img', function() {
    return gulp.src('assets/img/*.+(png|jpg|svg)')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('assets/img'));
});


gulp.task('sass', function() {
    setTimeout(function() {
        return gulp.src('assets/scss/main.scss')
            .pipe(sass())
            .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
            .pipe(gulp.dest('assets/css'));
    }, 1000);
});


gulp.task('clean', function() {
    return del.sync(['css', 'fonts', 'img', 'js', 'index.html']);
});

gulp.task('build', ['clean', 'img', 'sass'], function() {

    var buildCss = gulp.src('assets/css/*.css')
        .pipe(gulp.dest('css'))

    var buildFonts = gulp.src('assets/fonts/**/*')

    var buildJs = gulp.src('assets/js/**/*.js')
        .pipe(gulp.dest('js'))

    var buildHtml = gulp.src('assets/index.html')
        .pipe(gulp.dest(''));

});

gulp.task('html', function() {
    gulp.src('assets/parts/index.html')
        .pipe(rigger())
        .pipe(gulp.dest('assets'));
})

gulp.task('clear', function() {
    return cache.clearAll();
});

gulp.task('default', ['watch']);