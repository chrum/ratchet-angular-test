var path = require('path');
var sh = require('shelljs');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gutil = require('gulp-util');
var open = require('open');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var webpackConfig = require('./webpack.config.js');
var webpackLibsConfig = require('./webpack.libs.config.js');

var paths = {
    sass: ['./src/scss/styles.scss'],
    sources_js: ['./src/js/app.js', './src/js/**/*.js'],
    libs_js: ['./src/libs/index.js', './src/libs/**/*.js'],
    sources_html: ['./src/js/**/templates/*.html']
};

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
    gulp.src(paths.sass)
        .pipe($.sass ({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('./www/css/'))
        /*
         .pipe(minifyCss({
         keepSpecialComments: 0
         }))
         .pipe(rename({ extname: '.min.css' }))
         .pipe(gulp.dest('./www/css/'))
         */
        .on('end', done);
});

gulp.task('jscs', function () {
    gulp.src(paths.scripts_js)
        .pipe($.jscs())
        .pipe($.notify({
            title: 'JSCS',
            message: 'JSCS Passed. Let it fly!'
        }));
});

gulp.task('lint', function () {
    gulp.src(paths.scripts_js)
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'))
        .pipe($.notify({
            title: 'JSHint',
            message: 'JSHint Passed. Let it fly!'
        }));
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src(paths.sources_js)
    // .pipe(jshint(''))
    // .pipe(jshint.reporter('default'))
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .on('error', function (error) {
        console.log(error.toString());
        this.emit('end');
    })
    .pipe($.concat('scripts.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('www/js'))

    .pipe($.notify({message: 'Scripts task complete'}));
});

gulp.task('templates', function () {
    gulp.src(paths.sources_html)
        .pipe($.minifyHtml())
        .pipe($.ngHtml2js({
            moduleName: 'templatesModule',
            rename: function (templateUrl) {
                return templateUrl.replace('/templates', '');
            }
        }))
        .pipe($.concat('templates.js'))
        .pipe(gulp.dest('./www/js'));
});

gulp.task('webpack-libs', function (callback) {
    webpack(webpackLibsConfig, function (err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }

        gutil.log('[webpack]', stats.toString({
            colors: true
        }));

        callback();
    });
});

gulp.task('wds', [
    'webpack-libs',
    'scripts',
    'templates',
    'sass',
    'watch'
],
function () {
    new WebpackDevServer(webpack(webpackConfig), {
        contentBase: 'www',
        stats: {
            colors: true
        }

    }).listen(8080, 'localhost', function (err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }
        var startUrl = 'http://localhost:8080/webpack-dev-server/index.html';
        open(startUrl);
        gutil.log('[webpack-dev-server]', startUrl);

    });
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.sources_html, ['templates']);
    gulp.watch(paths.sources_js, ['scripts']);
});
