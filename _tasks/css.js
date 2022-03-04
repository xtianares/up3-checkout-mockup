// Gulp.js configuration
const
  gulp            = require('gulp'),
  plugin          = require('../_inc/plugin'),
  paths           = require('../_inc/paths')
;

const sass = () => {
  return gulp.src(paths.css.siteSass)
    .pipe(plugin.sourcemaps.init())
    .pipe(plugin.sass({
      outputStyle: 'nested', // set to expanded/compressed
      imagePath: 'images/',
      precision: 3,
      errLogToConsole: true
    }))
    .pipe(plugin.autoprefixer({
      cascade: true
    }))
    .pipe(plugin.cleancss({compatibility: 'ie10'}))
    .pipe(plugin.sourcemaps.write(''))
    .pipe(gulp.dest(paths.css.siteDest));
}

const sassVendor = () => {
  return gulp.src(paths.css.vendorSrc)
    .pipe(plugin.sourcemaps.init())
    .pipe(plugin.sass({
      outputStyle: 'nested', // set to expanded/compressed
      imagePath: 'images/',
      precision: 3,
      errLogToConsole: true
    }))
    .pipe(plugin.autoprefixer({
      cascade: true
    }))
    .pipe(plugin.cleancss({compatibility: 'ie10'}))
    .pipe(plugin.sourcemaps.write(''))
    .pipe(gulp.dest(paths.css.vendorDest));
}

// const bootstrapCss = () => {
//   return gulp.src(paths.css.bsSass)
//     .pipe(plugin.sourcemaps.init())
//     .pipe(plugin.sass({
//       outputStyle: 'nested', // set to expanded/compressed
//       imagePath: 'images/',
//       precision: 3,
//       errLogToConsole: true
//     }))
//     .pipe(plugin.autoprefixer({
//       cascade: true
//     }))
//     .pipe(plugin.cleancss({compatibility: 'ie10'}))
//     .pipe(plugin.sourcemaps.write(''))
//     .pipe(gulp.dest(paths.css.bsDest));
// }

//copying minified boostrap file instead of compiling it
const bootstrapCss = () => {
  return gulp.src([paths.css.bsMinCss, paths.css.bsMinCssMap])
    .pipe(gulp.dest(paths.css.bsDest));
};

const criticalCss = () => {
  // let criticalpath = gulp.src([paths.site.dest+'**/*.html', '!'+paths.site.dest+'index/index.html'])
  let criticalpath = gulp.src([paths.site.dest+'**/*.html'])
  // minify production code
  if (process.env.NODE_ENV == 'Staging' || process.env.NODE_ENV == 'Production') {
    criticalpath = criticalpath
    .pipe(plugin.critical({
      base: paths.site.dest,
      inline: true,
      css: [paths.css.siteDest+'main.css', paths.css.siteDest+'bootstrap/bootstrap.min.css'],
      // minify: true,
      penthouse: {
        include: ['#menutoggle', '.container.fluid'],
        timeout: 90000,
        pageLoadSkipTimeout: 90000,
        renderWaitTime: 100,
        blockJSRequest: true
      },
      dimensions: [{
        width: 1400,
        height: 1200
      }]
    }))
    .on('error', function(err) { plugin.gutil.log(plugin.gutil.colors.red(err.message)); })
  }
  return criticalpath.pipe(gulp.dest(paths.site.dest));
}

exports.sass = gulp.parallel(sass, sassVendor);
exports.bootstrapCss = bootstrapCss;
exports.criticalCss = criticalCss;
