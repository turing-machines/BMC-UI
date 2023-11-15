// Node
import del from "del"
import through from "through2"

// Gulp
import gulp from "gulp"
import plumber from "gulp-plumber"
import sourcemaps from "gulp-sourcemaps"
import gulpif from "gulp-if"
import notify from "gulp-notify"
import size from 'gulp-filesize'

// HTML
import fileinclude from 'gulp-file-include'
import versionNumber from "gulp-version-number";

// SASS
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

// PostCSS
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import sortMediaQueries from 'postcss-sort-media-queries'


// JS & Webpack
import webpack from "webpack"
import webpackStream from "webpack-stream"

// Enviroment
import {setDevelopmentEnvironment, setProductionEnvironment, isProduction, isDevelopment} from 'gulp-node-env'

setDevelopmentEnvironment()


// BrowserSync
import bs from "browser-sync"

const browserSync = bs.create()

const srcFolder = './src'
const buildFolder = './dist'

const paths = {
    html: {
        src: [
            `${srcFolder}/*.html`,
            `${srcFolder}/**/*.php`,
            `${srcFolder}/**/*.ejs`
        ],
        watch_srs: [
            `${srcFolder}/**/*.html`,
            `${srcFolder}/**/*.php`,
            `${srcFolder}/**/*.ejs`
        ],
        dest: `${buildFolder}/`
    },
    css: {
        src: [
            `${srcFolder}/assets/css/**/*.css`,
        ],
        dest: `${buildFolder}/assets/css/`
    },
    scss: {
        src: [
            `${srcFolder}/assets/css/*.scss`,
            `${srcFolder}/assets/css/components/*.scss`,
            `${srcFolder}/assets/css/tabs/*.scss`,
            `${srcFolder}/assets/css/other/*.scss`,
            `${srcFolder}/assets/css/pages/*.scss`,
            `${srcFolder}/assets/css/sections/*.scss`,
            `${srcFolder}/assets/css/vendors/*.scss`,
        ],
        dest: `${buildFolder}/assets/css/`
    },
    js: {
        src: [
            `${srcFolder}/assets/js/**/*.js`,
            `${srcFolder}/assets/js/components/*.js`,
            `${srcFolder}/assets/js/functions/*.js`,
            `${srcFolder}/assets/js/tabs/*.js`,
        ],
        dest: `${buildFolder}/assets/js/`
    },
    js_webpack_entry: {
        app: `${srcFolder}/assets/js/app.js`,
    },
    img: {
        src: `${srcFolder}/assets/img/**/*`,
        dest: `${buildFolder}/assets/img/`,
    },
    video: {
        src: `${srcFolder}/assets/video/**/**/*`,
        dest: `${buildFolder}/assets/video/`
    },
    vendors: {
        src: `${srcFolder}/assets/vendors/**/**/*`,
        dest: `${buildFolder}/assets/vendors/`
    },
    fonts: {
        src: [
            `${srcFolder}/assets/fonts/**/**/*`
        ],
        dest: [
            `${buildFolder}/assets/fonts/`
        ]
    }
}

const serve = () => {
    const proxyServer = true
    const domain = 'localhost'
    if (proxyServer) {
        browserSync.init({
            proxy: domain,
            notify: false,
            port: 4001
        })
    } else {
        browserSync.init({
            server: {
                baseDir: buildFolder
            },
            notify: false,
            port: 4001
        })
    }
}

const reload = () => {
    browserSync.reload()
}

const clean = () => {
    return del(buildFolder)
}

const scss = () => {
    const sass = gulpSass(dartSass)

    return gulp.src(paths.scss.src)
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "SCSS Error",
                    message: "<%= error.message %>"
                })(err)
            }
        }))
        .pipe(gulpif(isDevelopment, sourcemaps.init()))

        // SCSS
        .pipe(sass().on('error', sass.logError))

        // Dev PostCSS
        .pipe(gulpif(isDevelopment, postcss([
            autoprefixer(),
        ])))

        // Build PostCSS
        .pipe(gulpif(isProduction, postcss([
            autoprefixer(),
            cssnano({
                autoprefixer: true,
                cssDeclarationSorter: true,
                calc: true,
                colormin: true,
                convertValues: true,
                discardComments: {removeAll: true},
                discardDuplicates: true,
                discardEmpty: true,
                discardOverridden: true,
                discardUnused: true,
                mergeIdents: true,
                mergeLonghand: true,
                mergeRules: true,
                minifyFontValues: true,
                minifyGradients: true,
                minifyParams: true,
                minifySelectors: true,
                normalizeCharset: true,
                normalizeDisplayValues: true,
                normalizePositions: true,
                normalizeRepeatStyle: true,
                normalizeString: true,
                normalizeTimingFunctions: true,
                normalizeUnicode: true,
                normalizeUrl: true,
                normalizeWhitespace: true,
                orderedValues: true,
                reduceIdents: true,
                reduceInitial: true,
                reduceTransforms: true,
                svgo: true,
                uniqueSelectors: true,
                zindex: false,
            }),
            sortMediaQueries({
                sort: 'desktop-first' // default
            })
        ])))
        .pipe(gulpif(isDevelopment, sourcemaps.write('./')))
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(size())
        .pipe(browserSync.stream())
}

const js = () => {
    return gulp.src(paths.js.src)
        .pipe(plumber({
            errorHandler: function (err) {

                console.error('JS Plumber Error:', err);

                notify.onError({
                    title: "JS Error",
                    message: "<%= error.message %>"
                })(err)
            }
        }))

        // Webpack Development
        .pipe(gulpif(isDevelopment,
            webpackStream({
                entry: paths.js_webpack_entry,
                devtool: "eval-source-map",
                mode: 'development',
                module: {
                    rules: [
                        {
                            test: /\.(js)$/,
                            exclude: /(node_modules)/,
                            use: [
                                "babel-loader",
                                "thread-loader"
                            ],
                        },
                    ],
                },
                plugins: [
                    new webpack.ProvidePlugin({
                        $: 'jquery',
                        jQuery: 'jquery',
                    }),
                    new webpack.AutomaticPrefetchPlugin(),
                    new webpack.optimize.LimitChunkCountPlugin({
                        maxChunks: 1
                    })
                ],
                output: {
                    filename: '[name].js',
                    sourceMapFilename: "[name].js.map"
                },
            })
        )).on('error', function handleError() {
            this.emit('end'); // Recover from errors
        })

        // Webpack Production
        .pipe(
            gulpif(
                isProduction(),
                webpackStream({
                    entry: paths.js_webpack_entry,
                    devtool: false,
                    mode: "production",
                    module: {
                        rules: [
                            {
                                test: /\.(js)$/,
                                exclude: /(node_modules)/,
                                use: [
                                    "babel-loader",
                                    "thread-loader"
                                ],
                            },
                        ],
                    },
                    plugins: [
                        new webpack.AutomaticPrefetchPlugin(),
                        new webpack.optimize.LimitChunkCountPlugin({
                            maxChunks: 1,
                        }),
                        new webpack.ProvidePlugin({
                            $: "jquery",
                            jQuery: "jquery",
                        }),
                    ],
                    experiments: {
                        topLevelAwait: true,
                    },
                    output: {
                        filename: "[name].js",
                        sourceMapFilename: "[name].js.map",
                    },
                }).on("error", function (err) {
                    console.error(err); // Handle webpack errors
                    this.emit("end"); // Prevent Gulp from crashing
                })
            )
        )
        .on("error", function handleError() {
            this.emit("end"); // Recover from errors
        })

        .pipe(gulpif(isDevelopment, sourcemaps.init()))
        .pipe(through.obj(function (file, enc, cb) {
            const isSourceMap = /\.map$/.test(file.path);
            if (!isSourceMap) this.push(file);
            cb();
        }))
        .pipe(gulpif(isDevelopment, sourcemaps.write('./')))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(size())
        .pipe(browserSync.stream())
}

const html = () => {
    return gulp.src(paths.html.src)
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "HTML Error",
                    message: "<%= error.message %>"
                })(err)
            }
        }))

        // Combine HTML Parts
        .pipe(fileinclude())

        // Add version to scripts & styles
        .pipe(gulpif(isProduction(),
            versionNumber({
                'value': '%DT%',
                'append': {
                    'key': '_v',
                    'cover': 0,
                    'to': [
                        'css',
                        'js',
                    ]
                },
            })
        ))


        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream())
}

const img = () => {
    return gulp.src(paths.img.src)
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "Image Error",
                    message: "<%= error.message %>"
                })(err)
            }
        }))

        .pipe(gulp.dest(paths.img.dest))
        .pipe(browserSync.stream())
}

const files = (end) => {
    // Fonts
    gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))

    // Vendors
    gulp.src(paths.vendors.src)
        .pipe(gulp.dest(paths.vendors.dest))

    // Videos
    gulp.src(paths.video.src)
        .pipe(gulp.dest(paths.video.dest))
        .pipe(browserSync.stream())

    // CSS
    gulp.src(paths.css.src)
        .pipe(gulp.dest(paths.css.dest))
        .pipe(browserSync.stream())

    // Images
    gulp.src(paths.img.src)
        .pipe(gulp.dest(paths.img.dest))
        .pipe(browserSync.stream())

    end()
}

const watch = () => {
    // SCSS
    gulp.watch(paths.scss.src, gulp.series(scss))

    // JS
    gulp.watch(paths.js.src, gulp.series(js))

    // HTML
    gulp.watch(paths.html.watch_srs, gulp.series(html))

    // Vendors folder
    gulp.watch(paths.vendors.src, gulp.series(reload))

    // Video
    gulp.watch(paths.video.src, gulp.series(reload))

    // Fonts
    gulp.watch(paths.fonts.src, gulp.series(reload))

    // images
    gulp.watch(paths.img.src, gulp.series(img))
}

export {serve, reload, watch, clean, scss, js, html, files, img}

const dev = gulp.series(setDevelopmentEnvironment, clean, gulp.parallel(files, scss, js), html, img, gulp.parallel(watch, serve))
const build = gulp.series(setProductionEnvironment, clean, gulp.parallel(files, scss, js), html, img)

export {dev, build}
export {dev as default}