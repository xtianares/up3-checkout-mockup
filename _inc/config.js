// Gulp.js configuration
const
  // modules
  replace         = require('gulp-replace'),

  // replacement settings
  price_default_pids          = '["813", "823", "860", "861", "862", "863", "867", "868", "869", "870", "872", "874", "877", "887", "888", "890", "891", "892", "893", "894", "895", "896", "897", "898", "899", "900", "975", "978", "995", "996", "1004", "1154", "1197", "1198", "1199", "1200", "1206", "1223", "1224", "1311", "1318", "1426", "1496", "1737", "1738", "1750", "1753", "1756", "1757", "1759", "1761", "1763", "1777", "1778", "1785", "1786", "1794", "1795", "1796", "1801", "1807", "1808", "1811", "1812", "1815", "1817", "1825", "1832", "1842", "1848", "1850", "1854", "1857", "2021", "2040", "2041", "3089", "3342", "3343", "3344", "3345", "3346", "3347", "3348", "3349", "3350", "3352", "3355", "3356", "3357", "3367", "3368", "3369", "3370", "3371", "3381", "3382", "3383", "3384", "3385", "3386", "3407", "3413", "3414", "3415", "3416", "3417", "3418", "3419", "3420", "3421", "3422", "3423", "3424", "3425", "3426", "3427", "3436", "3438", "3440", "3446", "3447", "3448", "3449", "3452", "3453", "3454", "3455", "3456", "3457", "3458", "3459", "3460", "3461", "3462", "3463", "3464", "3468", "3470", "3476"]',
  // defaut PIDs for this site/build
  price_default_pkgids        = '["11", "18", "45","46", "47", "48"]', // defaut PKGIDs for this site/build
  price_default_lgr           = 'a864b5d7-aa7a-e111-a5d1-000e0c4c5fe4', // default LGR for this site/build
  default_lgr_attributes      = `{}`, // using template strngs, default LGA for this site/build example used from NYSC's web.config settings
  default_host                = 'oshaeducationcenter.com', // default LGR for this site/build
  site_url                    = 'https://www.oshaeducationcenter.com', // final url of the site

  // Application Insights instrumentation key
  iKey                        = '71818469-f9ff-486c-9184-a1b4ffe2f54f', // Replace with site's Application Insights unique instrumentation key ("iKey")

  dl_apiURL_domain            = 'https://dlapi.amersc.com',
  dl_apiURL_registration      = 'https://dlapi.amersc.com/registration/api/v2.0/',
  dl_apiURL_product           = 'https://dlapi.amersc.com/product/api/v2.0/',
  dl_apiURL_geolocation       = 'https://dlapi.amersc.com/geolocation/api/v1.0/',
  dl_loginURL                 = 'https://dlhome.amersc.com/studentlogin.aspx?host=' + default_host,
  dl_registration_domain      = 'https://dlcheckout.oshaeducationcenter.com',
  dl_registration_reg2_domain = 'https://dlhome.amersc.com',
  dl_cdn_domain               = 'https://dlcdn.amersc.com',

  ml_apiURL_domain            = 'https://mlapi.amersc.com',
  ml_apiURL_registration      = 'https://mlapi.amersc.com/registration/api/v2.0/',
  ml_apiURL_product           = 'https://mlapi.amersc.com/product/api/v2.0/',
  ml_apiURL_geolocation       = 'https://mlapi.amersc.com/geolocation/api/v1.0/',
  ml_loginURL                 = 'https://mlhome.amersc.com/studentlogin.aspx?host=' + default_host,
  ml_registration_domain      = 'https://mlcheckout.oshaeducationcenter.com',
  ml_registration_reg2_domain = 'https://mlhome.amersc.com',
  ml_cdn_domain               = 'https://mlcdn.amersc.com',

  prod_apiURL_domain          = 'https://api.amersc.com',
  prod_apiURL_registration    = 'https://api.amersc.com/registration/api/v2.0/',
  prod_apiURL_product         = 'https://api.amersc.com/product/api/v2.0/',
  prod_apiURL_geolocation     = 'https://api.amersc.com/geolocation/api/v1.0/',
  prod_loginURL               = 'https://home.uceusa.com/studentlogin.aspx?host=' + default_host,
  prod_registration_domain    = 'https://checkout.oshaeducationcenter.com',
  prod_registration_reg2_domain = 'https://home.uceusa.com',
  prod_cdn_domain             = 'https://cdn.amersc.com',

  local_apiURL_domain         = 'http://localhost:49929',
  local_apiURL_registration   = 'http://localhost:49929/registration/api/v2.0/', // change this to your own local url
  local_apiURL_product        = 'http://localhost:50817/product/api/v2.0/',  // change this to your own local url
  local_apiURL_geolocation    = 'http://localhost:50817/geolocation/api/v1.0/',  // change this to your own local url
  local_loginURL              = 'http://localhost:58804/studentlogin.aspx?host=' + default_host,  // change this to your own local url
  local_registration_domain   = 'https://dlcheckout.oshaeducationcenter.com',
  local_registration_reg2_domain = 'https://dlhome.amersc.com',
  local_cdn_domain            = 'https://dlcdn.amersc.com'
;

module.exports =  {
  set: function (theStream) {
    theStream = theStream
      .pipe(replace('default_pids_replaced_during_build', price_default_pids))
      .pipe(replace('default_pkgids_replaced_during_build', price_default_pkgids))
      .pipe(replace('default_lgr_replaced_during_build', price_default_lgr))
      .pipe(replace('default_lgr_attributes_replaced_during_build', default_lgr_attributes))
      .pipe(replace('default_host_replaced_during_build', default_host));

    if (process.env.NODE_ENV == 'Development') {
      theStream = theStream
        .pipe(replace('apiURL_domain_replaced_during_build', dl_apiURL_domain))
        .pipe(replace('apiURL_registration_replaced_during_build', dl_apiURL_registration))
        .pipe(replace('apiURL_product_replaced_during_build', dl_apiURL_product))
        .pipe(replace('apiURL_geolocation_replaced_during_build', dl_apiURL_geolocation))
        .pipe(replace('loginURL_replaced_during_build', dl_loginURL))
        .pipe(replace('registration_domain_replaced_during_build', dl_registration_domain))
        .pipe(replace('registration_reg2_domain_replaced_during_build', dl_registration_reg2_domain))
        .pipe(replace('cdn_domain_replaced_during_build', dl_cdn_domain));
    }
    else if (process.env.NODE_ENV == 'Staging') {
      theStream = theStream
        .pipe(replace('apiURL_domain_replaced_during_build', ml_apiURL_domain))
        .pipe(replace('apiURL_registration_replaced_during_build', ml_apiURL_registration))
        .pipe(replace('apiURL_product_replaced_during_build', ml_apiURL_product))
        .pipe(replace('apiURL_geolocation_replaced_during_build', ml_apiURL_geolocation))
        .pipe(replace('loginURL_replaced_during_build', ml_loginURL))
        .pipe(replace('registration_domain_replaced_during_build', ml_registration_domain))
        .pipe(replace('registration_reg2_domain_replaced_during_build', ml_registration_reg2_domain))
        .pipe(replace('cdn_domain_replaced_during_build', ml_cdn_domain));
    }
    else if (process.env.NODE_ENV == 'Production') {
      theStream = theStream
        .pipe(replace('INSTRUMENTATION_KEY', iKey))
        .pipe(replace('apiURL_domain_replaced_during_build', prod_apiURL_domain))
        .pipe(replace('apiURL_registration_replaced_during_build', prod_apiURL_registration))
        .pipe(replace('apiURL_product_replaced_during_build', prod_apiURL_product))
        .pipe(replace('apiURL_geolocation_replaced_during_build', prod_apiURL_geolocation))
        .pipe(replace('loginURL_replaced_during_build', prod_loginURL))
        .pipe(replace('registration_domain_replaced_during_build', prod_registration_domain))
        .pipe(replace('registration_reg2_domain_replaced_during_build', prod_registration_reg2_domain))
        .pipe(replace('cdn_domain_replaced_during_build', prod_cdn_domain));
    }
    else  {
      theStream = theStream
        .pipe(replace('apiURL_domain_replaced_during_build', local_apiURL_domain))
        .pipe(replace('apiURL_registration_replaced_during_build', local_apiURL_registration))
        .pipe(replace('apiURL_product_replaced_during_build', local_apiURL_product))
        .pipe(replace('apiURL_geolocation_replaced_during_build', local_apiURL_geolocation))
        .pipe(replace('loginURL_replaced_during_build', local_loginURL))
        .pipe(replace('registration_domain_replaced_during_build', local_registration_domain))
        .pipe(replace('registration_reg2_domain_replaced_during_build', local_registration_reg2_domain))
        .pipe(replace('cdn_domain_replaced_during_build', local_cdn_domain));
    }
    theStream = theStream.on("data", function() {});
  },
  site_url: site_url
}
