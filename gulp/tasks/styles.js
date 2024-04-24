import gulp from 'gulp'
import replace from 'gulp-replace'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import plumber from 'gulp-plumber'
import webpcss from 'gulp-webpcss'
import autoprefixer from 'gulp-autoprefixer'
import gcmq from 'gulp-group-css-media-queries'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'
import gulpif from 'gulp-if'
import importFresh from 'import-fresh'
import sassGlob from 'gulp-sass-glob'
import config from '../config'

const sass = gulpSass(dartSass)

const sassBuild = () =>
    gulp
        .src(`${config.src.sass}/main.scss`, { sourcemaps: config.isDev })
        // .pipe(plumber())
        .pipe(sassGlob())
        .pipe(
            sass({
                includePaths: ['./node_modules'],
            })
        )
        .pipe(gulpif(config.isProd, gcmq()))
        .pipe(
            gulpif(
                config.isProd,
                webpcss({
                    webpClass: '.webp',
                    noWebpClass: '.no-webp',
                })
            )
        )
        .pipe(replace(/@img\//g, '../images/'))
        .pipe(
            gulpif(
                config.isProd,
                autoprefixer({
                    overridBrowserslist: ['last 3 versions'],
                    cascade: true,
                    grid: true,
                })
            )
        )
        .pipe(
            gulpif(
                config.isProd,
                gulp.dest(config.dest.css, { sourcemaps: config.isDev })
            )
        )
        .pipe(gulpif(config.isProd, cleanCSS({ level: 2 })))
        .pipe(
            rename({
                suffix: '.min',
            })
        )
        .pipe(gulp.dest(config.dest.css, { sourcemaps: config.isDev }))

export const stylesBuild = gulp.series(sassBuild)

export const stylesWatch = () => {
    gulp.watch(`${config.src.sass}/**/*.scss`, sassBuild)
}
