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
    rigger = require('gulp-rigger'),
    spritesmith = require('gulp.spritesmith'),
    htmlmin = require('gulp-htmlmin');


var realFavicon = require('gulp-real-favicon');
var fs = require('fs');
var FAVICON_DATA_FILE = 'faviconData.json';

gulp.task('generate-favicon', function(done) {
    realFavicon.generateFavicon({
        masterPicture: './assets/img/favicon.png',
        dest: './assets',
        iconsPath: './assets',
        design: {
            ios: {
                pictureAspect: 'backgroundAndMargin',
                backgroundColor: '#ffffff',
                margin: '14%',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: true,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                }
            },
            desktopBrowser: {},
            windows: {
                pictureAspect: 'whiteSilhouette',
                backgroundColor: '#a2ca28',
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                        small: false,
                        medium: true,
                        big: false,
                        rectangle: false
                    }
                }
            },
            androidChrome: {
                pictureAspect: 'noChange',
                themeColor: '#ffffff',
                manifest: {
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            },
            safariPinnedTab: {
                pictureAspect: 'silhouette',
                themeColor: '#fd634e'
            }
        },
        settings: {
            compression: 5,
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false
        },
        markupFile: FAVICON_DATA_FILE
    }, function() {
        done();
    });
});

gulp.task('inject-favicon-markups', function() {
    return gulp.src(['assets/parts/index.html'])
        .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
        .pipe(gulp.dest('assets/parts'));
});

gulp.task('check-for-favicon-update', function(done) {
    var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
    realFavicon.checkForUpdates(currentVersion, function(err) {
        if (err) {
            throw err;
        }
    });
});

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
    return gulp.src(['assets/js/main.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});

gulp.task('css-min', ['sass'], function() {
    return gulp.src(['assets/css/*.css', '!assets/css/*min.css'])
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('watch', ['browser-sync', 'html', 'css-min', 'scripts'], function() {
    gulp.watch('assets/scss/**/*.scss', ['css-min']);
    gulp.watch('assets/**/*.html', ['html', browserSync.reload]);
    gulp.watch('assets/js/**/*.js', ['scripts', browserSync.reload]);
});

gulp.task('clean', function() {
    return del.sync(['*.html', 'css/', 'js/', 'fonts/', 'img/']);
});

gulp.task('buildImg', function() {
    return gulp.src('assets/img/**/*.+(jpg|png|svg)')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: true }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('img'));
});

gulp.task('buildHtml', ['html'], function() {
    return gulp.src('assets/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(''))
})

gulp.task('buildCss', ['css-min'], function() {
    return gulp.src(['assets/css/*.css'])
        .pipe(gulp.dest('css/'))
})

gulp.task('buildFonts', function() {
    return gulp.src(['assets/fonts/*.*'])
        .pipe(gulp.dest('fonts/'))
})

gulp.task('buildJs', ['scripts'], function() {
    return gulp.src(['assets/js/*.min.js'])
        .pipe(gulp.dest('js/'))
})

gulp.task('buildFavicons', function() {
    return gulp.src(['assets/*.png', 'assets/browserconfig.xml', 'assets/*.svg', 'assets/manifest.json'])
        .pipe(gulp.dest(''))
})

gulp.task('build', ['clean', 'buildHtml', 'buildImg', 'buildCss', 'buildJs', 'buildFonts'])

gulp.task('clear', function() {
    return cache.clearAll();
})

gulp.task('default', ['watch']);