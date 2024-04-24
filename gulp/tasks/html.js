import gulp from 'gulp'
import replace from 'gulp-replace'
import fileinclude from 'gulp-file-include'
import webpHtmlNoSvg from 'gulp-webp-html-nosvg'
import gulpif from 'gulp-if'
import plumber from 'gulp-plumber'
import config from '../config'

export const htmlBuild = () =>
  gulp
    .src(`${config.src.html}/*.html`)
    .pipe(plumber())
    .pipe(fileinclude())
    .pipe(gulpif(config.isProd, webpHtmlNoSvg()))
    .pipe(replace(/@img\//g, 'images/'))
    .pipe(gulp.dest(`${config.dest.html}`))

export const htmlWatch = () =>
  gulp.watch(`${config.src.html}/**/*.html`, htmlBuild)
