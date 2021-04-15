// Gulp.js configuration
const
  gulp            = require('gulp'),
  plugin          = require('../_inc/plugin'),
  config          = require('../_inc/config'),
  paths           = require('../_inc/paths')
;

// site page/html processing
const html = () => {
  let page = gulp.src(paths.html.sitePages)
    // .pipe(plugin.newer(paths.site.dest))
    .pipe(plugin.nunjucksRender({
      ext: '/index.html',
      path: [paths.html.templatesFolder]
    }));

  config.set(page); // run replacement settings from config file

  // minify production code
  if (process.env.NODE_ENV == 'Staging' || process.env.NODE_ENV == 'Production') {
    console.log(process.env.NODE_ENV);
    page.pipe(plugin.htmlmin({
      collapseWhitespace: true,
      // preserveLineBreaks: true,
      // minifyCSS: true,
      // minifyJS: true
      removeComments: true,
    }))
    .pipe(plugin.minifyInline({
        jsSelector: 'script[class!="no-min"]'
    }))
    .on("data", function() {}); // fix for hanging during optimization
  }

  return page.pipe(gulp.dest(paths.site.dest));
};

// complete html build and moving index file outside of the "index" folder
const moveIndex = (cb) => {
  plugin.fs.move (
    paths.site.dest + 'index/index.html', // file to move
    paths.site.dest + 'index.html',       // where to move
    { clobber: true },
    function(err) {
      // if (err) return console.log(err);
      plugin.fs.remove(paths.site.dest + "index");
    }
  );
  return cb();
};

exports.moveIndex = moveIndex;
exports.html = html;
