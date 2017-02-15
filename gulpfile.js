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
    postcss = require('gulp-postcss'),
    mqpacker = require("css-mqpacker"),
    htmlmin = require('gulp-htmlmin');



// gulp.task('sassConcat', function() {
//     return gulp.src(['assets/scss/_import.scss', 'assets/blocks/**/*.scss'])
//         .pipe(concat('main.scss'))
//         .pipe(gulp.dest('assets/scss/'))
// });

gulp.task('sass', function() {
    setTimeout(function() {
        return gulp.src('assets/scss/**/*.scss')
            .pipe(sass())
            .pipe(autoprefixer(['last 5 versions', '> 1%'], { cascade: true }))
            .pipe(postcss([mqpacker()]))
            .pipe(gulp.dest('assets/css'))
            .pipe(browserSync.reload({ stream: true }));
    }, 100);
});

gulp.task('html', function() {
    gulp.src('assets/parts/index.html')
        .pipe(rigger())
        .pipe(gulp.dest('assets'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'assets'
        },
        notify: false
    });
});

gulp.task('scripts', function() {
    return gulp.src([])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});

gulp.task('css-min', ['sass'], function() {
    return gulp.src(['assets/css/*.css', '!assets/css/*min.css'])
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch(['assets/scss/**/*.scss'], ['sass']);
    gulp.watch('assets/**/*.html', ['html', browserSync.reload]);
    gulp.watch('assets/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync(['*.html', 'css/', 'js/', 'fonts/', 'img/']);
});

gulp.task('img', function() {
    return gulp.src('assets/img/**/*.*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('img'));
});

gulp.task('buildHtml', function() {
    return gulp.src('assets/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(''))
})

gulp.task('buildCss', function() {
    return gulp.src(['assets/css/*.css'])
        .pipe(gulp.dest('css/'))
})

gulp.task('buildFonts', function() {
    return gulp.src(['assets/fonts/*.*'])
        .pipe(gulp.dest('fonts/'))
})

gulp.task('buildJs', function() {
    return gulp.src(['assets/js/*.js'])
        .pipe(gulp.dest('js/'))
})

gulp.task('buildImg', function() {
    return gulp.src(['assets/img/*.+(jpg|png|svg)'])
        .pipe(gulp.dest('img/'))
})


gulp.task('build', ['css-min', 'clean', 'img', 'buildHtml', 'buildCss', 'buildJs', 'buildFonts'])

gulp.task('clear', function() {
    return cache.clearAll();
})

gulp.task('default', ['watch']);