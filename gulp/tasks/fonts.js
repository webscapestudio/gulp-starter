import gulp from 'gulp'
// import plumber from 'gulp-plumber'
import ttf2woff from 'gulp-ttf2woff'
import ttf2woff2 from 'gulp-ttf2woff2'
import config from '../config'

export const fontsConvertWoff = () => (
  gulp.src(`${config.src.fonts}/**/*.ttf`)
    .pipe(ttf2woff())
    .pipe(gulp.dest(config.dest.fonts))
)

export const fontsConvertWoff2 = () => (
  gulp.src(`${config.src.fonts}/**/*.ttf`)
    .pipe(ttf2woff2())
    .pipe(gulp.dest(config.dest.fonts))
)

export const fontsBuild = gulp.series(fontsConvertWoff, fontsConvertWoff2)

export const fontsWatch = () => {
  gulp.watch(`${config.src.fonts}/**/*`, fontsBuild)
}
