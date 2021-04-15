// Gulp.js configuration
const
  gulp            = require('gulp'),
  plugin          = require('../_inc/plugin'),
  config          = require('../_inc/config'),
  paths           = require('../_inc/paths')
;

// site js processing
const jsConcat = () => {
  let jsbuild = gulp.src(paths.js.siteRootFiles)
    .pipe(plugin.sourcemaps.init())
    .pipe(plugin.deporder())
    .pipe(plugin.babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(plugin.concat('main.min.js'));

    config.set(jsbuild); // run replacement settings from config file

  // minify production code
  if (process.env.NODE_ENV == 'Staging' || process.env.NODE_ENV == 'Production') {
    jsbuild = jsbuild
      .pipe(plugin.stripdebug())
      .pipe(plugin.uglify());
  }
  jsbuild = jsbuild.pipe(plugin.sourcemaps.write(''));

  return jsbuild.pipe(gulp.dest(paths.js.siteDest));
};

// copying js files to build forder
const jsCopy = () => {
  return gulp.src([paths.js.siteFiles, "!" + paths.js.vendorSrc])
    .pipe(plugin.newer(paths.js.siteDest))
    .pipe(plugin.babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(gulp.dest(paths.js.siteDest));
};

// copying vendor js files
const vendorCopy = () => {
  let vendorCopy = gulp.src([paths.js.vendorSrc])
    .pipe(plugin.sourcemaps.init())
    .pipe(plugin.newer(paths.js.vendorDest))
    .pipe(plugin.babel({
      presets: ['@babel/preset-env']
    }));
  // minify production code
  if (process.env.NODE_ENV == 'Staging' || process.env.NODE_ENV == 'Production') {
    vendorCopy = vendorCopy
      .pipe(plugin.stripdebug())
      .pipe(plugin.uglify());
  }
  vendorCopy = vendorCopy.pipe(plugin.sourcemaps.write(''));
  return vendorCopy.pipe(gulp.dest(paths.js.vendorDest));
};

// bootstrap js processing
// const jsBootstrap = () => {
//   return gulp.src([paths.js.bsFile])
//     .pipe(plugin.sourcemaps.init())
//     .pipe(plugin.newer(paths.js.siteDest))
//     // .pipe(plugin.babel({
//     //   presets: ['@babel/preset-env']
//     // }))
//     // .pipe(plugin.stripdebug())
//     // .pipe(plugin.uglify())
//     .pipe(plugin.sourcemaps.write(''))
//     .pipe(gulp.dest(paths.js.siteDest));
// };

const jsBootstrap = () => {
  return gulp.src([paths.js.bsFile, paths.js.bsFileMap])
    .pipe(gulp.dest(paths.js.siteDest));
};

// js processing
// exports.js = gulp.parallel(jsConcat, jsCopy);
exports.jsConcat = jsConcat;
exports.jsCopy = jsBootstrap;
exports.jsCopy = gulp.parallel(jsBootstrap, jsCopy, vendorCopy);
