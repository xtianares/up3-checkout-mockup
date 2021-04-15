// folders paths
module.exports = {
  site: {
    src: '_src/',
    dest: '_build/'
  },
  html: {
    sitePages: '_src/pages/**/*.+(html|njk)',
    siteFolder: '_src/pages/',
    templatesFiles: '_src/templates/**/*',
    templatesFolder: '_src/templates/'
  },
  images: {
    siteFiles: '_src/images/**/*',
    siteFolder: '_src/images/',
    siteDest: '_build/images/',
  },
  css: {
    siteFiles: '_src/scss/**/*',
    siteFolder: '_src/scss/',
    siteSass: '_src/scss/main.scss',
    siteDest: '_build/css/',
    vendorSrc: '_src/scss/vendor/**/*',
    vendorDest: '_build/css/vendor',
    bsFiles: 'node_modules/bootstrap/scss/**/*',
    bsFolder: 'node_modules/bootstrap/scss/',
    bsSass: 'node_modules/bootstrap/scss/bootstrap.scss',
    bsMinCss: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
    bsMinCssMap: 'node_modules/bootstrap/dist/css/bootstrap.min.css.map',
    bsDest: '_build/css/bootstrap'
  },
  js: {
    siteFiles: '_src/js/**/*',
    siteRootFiles: '_src/js/*',
    siteFolder: '_src/js/',
    vendorSrc: '_src/js/vendor/**/*',
    vendorDest: '_build/js/vendor',
    bsFile: 'node_modules/bootstrap/dist/js/bootstrap.min.js',
    bsFileMap: 'node_modules/bootstrap/dist/js/bootstrap.min.js.map',
    siteDest: '_build/js/',
  },
  downloads: {
    files: '_src/downloads/**/*',
    folder: '_src/downloads',
    dest: '_build/downloads/'
  },
  root: {
    files: '_src/root/**/*'
  }
}
