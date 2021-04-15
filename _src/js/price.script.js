/* requires:
polyfill.js
*/

function readCookie(name) {
  let nameEQ = escape(name) + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
  }
  return null;
}
function setLGRCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  }
  const domain = location.hostname == "localhost" ? "" : ";domain=." + location.hostname.split('.').reverse()[1] + "." + location.hostname.split('.').reverse()[0];
  const security = location.hostname == "localhost" ? "" : ";SameSite=None; Secure";
  document.cookie = name + "=" + value + expires + ";path=/" + domain + security;
}
function setCrossCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  }
  const domain = location.hostname == "localhost" ? "" : ";domain=." + location.hostname.split('.').reverse()[1] + "." + location.hostname.split('.').reverse()[0];
  const security = location.hostname == "localhost" ? "" : ";SameSite=None; Secure";
  document.cookie = name + "=" + value + expires + ";path=/" + domain + security;
}
function getQueryString(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function updateQueryStringParameter(uri, key, value) {
  let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  let separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  } else {
    return uri + separator + key + "=" + value;
  }
}

let price_lgr,
    price_rr;

let apiUrl = "apiURL_product_replaced_during_build", // this will be dynamically replaced by the build
    price_pids = default_pids_replaced_during_build, // this will be dynamically replaced by the build
    price_pkgids = default_pkgids_replaced_during_build, // this will be dynamically replaced by the build
    default_host = "default_host_replaced_during_build", // this will be dynamically replaced by the build
    default_lgr_attributes = default_lgr_attributes_replaced_during_build || {}, // this will be dynamically replaced by the build
    price_default_lgr = "default_lgr_replaced_during_build", // this will be dynamically replaced by the build
    price_query_lgr = getQueryString("lgr", window.location.href),
    price_query_rr = getQueryString("rr", window.location.href);

if (price_query_lgr !== null && price_query_lgr !== "") {
  setLGRCookie('lgr', price_query_lgr.toLowerCase(), 60);
  price_lgr = readCookie("lgr");
  // console.log(1);
} else if (readCookie("lgr") !== null && readCookie("lgr") !== "") {
  price_lgr = readCookie("lgr");
  // console.log(2);
} else {
  setLGRCookie("lgr", price_default_lgr.toLowerCase(), 60);
  price_lgr = readCookie("lgr");
  // console.log(3);
}

// setting the cross-domain lgrx cookie for reg3 enhancement
const lgrx_cookie = readCookie('lgr') !== null ? (readCookie('lgr')).toLowerCase() : null;
if (lgrx_cookie !== null) {
  setCrossCookie('lgrx', lgrx_cookie, 60);
}

if (price_query_rr !== null && price_query_rr !== "") {
  setLGRCookie('rr', price_query_rr, 60);
  price_rr = readCookie("rr");
} else if (readCookie("rr") != null && readCookie("rr") != "") {
  price_rr = readCookie("rr");
}

// applying the LGR replacement strings
function replaceLGA(useDefaultLGR) {
  // const jsonUrl = "https://mlapi.amersc.com/product/api/v2.0/linkgeneratorattributes/7517bb61-d11a-4620-a579-39fbbf8911ca";
  let jsonUrl;
  if (useDefaultLGR) {
    jsonUrl = apiUrl +'linkgeneratorattributes/'+ price_default_lgr;
  }
  else {
    jsonUrl = apiUrl +'linkgeneratorattributes/'+ price_lgr;
  }
  const lgaItems = [...document.getElementsByClassName("lga-item")]
  function applyLGA(data) {
    const lgaList = {...default_lgr_attributes, ...data};
    sessionStorage.setItem("LGAs", JSON.stringify(lgaList));
    function replaceLGAString(string, lgrString, replaceWith) {
      const pattern = new RegExp('\\$\\$' + lgrString + '\\$\\$', 'g');
      const newInnerHTML = string.replace(pattern, replaceWith);
      return newInnerHTML;
    }
    for (const key in lgaList) {
      if (lgaList[key] !== "") {
        lgaItems.forEach(lgaItem => {
          const lgaItemHTML = lgaItem.innerHTML;
          let value = lgaList[key].replace(/\+/g, "%20")
          lgaItem.innerHTML = replaceLGAString(lgaItemHTML, key, decodeURIComponent(value));
          if (lgaItemHTML.includes(`$${key}$$`)) {
            lgaItem.classList.add("lga-replaced");
          }
        });
      }
    }
  }
  const sessionLGAs = sessionStorage.getItem("LGAs") ? JSON.parse(sessionStorage.getItem("LGAs")) : null;
  if (sessionLGAs && sessionLGAs.LinkGeneratorGuid?.toLowerCase() == price_lgr) {
    applyLGA(sessionLGAs);
  }
  else {
    fetch(jsonUrl).then(checkFetchStatus)
      .then(data => {
        applyLGA(data);
      })
      .catch(function(err) {
        replaceLGA(true)
      });
  }
}
replaceLGA();

// appending LGR and RR query string in the registration URL
function modifyRegUrl(real_lgr) {
  const regLinks = [...document.querySelectorAll("a[href*='/registration/']")]
  regLinks.forEach(regLink => {
    let price_lgr = real_lgr || readCookie("lgr");
    let href = regLink.href;
    if (getQueryString("lgr", href) != null) {
      href = href;
    }
    else {
      href = href + "&lgr=" + price_lgr;
    }
    if (price_rr && getQueryString("rr", href) != null) {
      href = href;
    }
    else if (price_rr && getQueryString("rr", href) == null) {
      href = href + "&rr=" + price_rr;
    }
    regLink.href = href
    // console.log(href)
  });
}

function productApi(pids, callback) {
  let jsonUrl;
  if (pids.length === 1) {
    jsonUrl = apiUrl +'product/'+ pids.toString() +'/'+ price_lgr + '/'+ default_host + '/' + "?includeRelated=false"; // using API endpoint for multiple PIDs
  }
  else {
    jsonUrl = apiUrl +'products/'+ pids.toString() +'/'+ price_lgr + '/'+ default_host + '/' + "?includeRelated=false"; // using API endpoint for multiple PIDs
  }
  fetch(jsonUrl).then(checkFetchStatus)
    .then(data => {
      callback(data);
    })
    .catch(function(err) {
      productApiDefault(pids, callback)
    });
}
function productApiDefault(pids, callback) {
  let jsonUrl;
  if (pids.length === 1) {
    jsonUrl = apiUrl +'product/'+ pids.toString() +'/'+ price_default_lgr + '/'+ default_host + '/' + "?includeRelated=false"; // using API endpoint for multiple PIDs
  }
  else {
    jsonUrl = apiUrl +'products/'+ pids.toString() +'/'+ price_default_lgr + '/'+ default_host + '/' + "?includeRelated=false"; // using API endpoint for multiple PIDs
  }
  fetch(jsonUrl).then(checkFetchStatus)
    .then(data => {
      callback(data);
    });
}

function packageApi(pkgids, callback) {
  const jsonUrl = apiUrl +'package/'+ pkgids.toString() + '/' + default_host + '/' + price_lgr + '/' + "?includeRelated=false";
  fetch(jsonUrl).then(checkFetchStatus)
    .then(data => {
      callback(data);
    })
    .catch(function(err) {
      packageApiDefault(pkgids, callback)
    });
}
function packageApiDefault(pkgids, callback) {
  const jsonUrl = apiUrl +'package/'+ pkgids.toString() + '/' + default_host + '/' + price_default_lgr + '/' + "?includeRelated=false";
  fetch(jsonUrl).then(checkFetchStatus)
    .then(data => {
      callback(data);
    });
}

function chunkArray(myArray, size){
  let results = [],
      index = 0;
  while (index < myArray.length) {
    results.push(myArray.slice(index, size + index));
    index += size;
  }
  return results;
}

function displayPrice(data) {
  //console.log(data)
  function showPrice(pid) {
    const priceDisplay = pid.price_per_unit.amount;
    const priceDollars = pid.price_per_unit.display_dollars;
    const priceCents = pid.price_per_unit.display_cents;
    const origPrice = Math.round((priceDisplay + (priceDisplay * .2)).toFixed(0) / 5) * 5; // adding 20% to current price for display
    [...document.getElementsByClassName("dollars pid-" + pid.id)].forEach(item => item.innerHTML = priceDollars);
    [...document.getElementsByClassName("cents pid-" + pid.id)].forEach(item => priceCents !== "00" ? item.innerHTML = priceCents : item.classList.add("display-none"));
    [...document.getElementsByClassName("fullprice pid-" + pid.id)].forEach(item => item.innerHTML = priceDisplay.toFixed(2));
    [...document.getElementsByClassName("origprice pid-" + pid.id)].forEach(item => item.innerHTML = origPrice);
    [...document.getElementsByClassName("dollars pid-" + pid.id)].forEach(item => item.closest(".price").classList.add("shown"));
  }
  if (Array.isArray(data)) {
    data.forEach(pid => showPrice(pid, false))
  }
  else {
    if (data.price_per_unit != null){
      showPrice(data);
    }
  }
}
function displayPackagePrice(pkgid) {
  // console.log(pkgid)
  if (pkgid.price_per_unit != null){
    const priceDisplay = pkgid.price_per_unit.amount;
    const priceDollars = pkgid.price_per_unit.display_dollars;
    const priceCents = pkgid.price_per_unit.display_cents;
    const origPrice = Math.round((priceDisplay + (priceDisplay * .2)).toFixed(0) / 5) * 5; // adding 20% to current price for display
    const discountAmount = Math.abs(pkgid.package_products?.filter(item => item.id === 1324)[0]?.price_per_unit?.amount || 0).toFixed(2);
    [...document.getElementsByClassName("dollars pkgid-" + pkgid.id)].forEach(item => item.innerHTML = priceDollars);
    [...document.getElementsByClassName("cents pkgid-" + pkgid.id)].forEach(item => priceCents !== "00" ? item.innerHTML = priceCents : item.classList.add("display-none"));
    [...document.getElementsByClassName("fullprice pkgid-" + pkgid.id)].forEach(item => item.innerHTML = priceDisplay.toFixed(2));
    [...document.getElementsByClassName("origprice pkgid-" + pkgid.id)].forEach(item => item.innerHTML = origPrice);
    [...document.getElementsByClassName("dollars pkgid-" + pkgid.id)].forEach(item => item.closest(".price").classList.add("shown"));
    [...document.getElementsByClassName("savings-amount pkgid-" + pkgid.id)].forEach(item => item.innerHTML = `$${discountAmount}`);
  }
}

function addPriceToSession(data, pkgflag) {
  const discount = (data.package_products?.filter(item => item.id === 1324)[0]?.price_per_unit?.amount || 0) * -1;
  const product_price = {
        id: data.id,
        amount: data.price_per_unit.amount,
        display_dollars: data.price_per_unit.display_dollars,
        display_cents: data.price_per_unit.display_cents,
        discount: discount.toFixed(2),
        lgr: data.lgr
  };
  const prefix = pkgflag ? 'pkgid_' : 'pid_';
  sessionStorage.setItem(prefix + data.id, JSON.stringify(product_price))
}

function getProductPrice(pids) {
  const chunk_pids = chunkArray(pids, 30);
  chunk_pids.forEach(current_pids => {
    productApi(current_pids, function(data){
      // console.log(current_pids.length)
      if (data !== undefined && current_pids.length > 1) {
        data.forEach(data => addPriceToSession(data))
        sessionStorage.setItem('asc_pricing', true);
        displayPrice(data);
      }
      else if (data !== undefined && current_pids.length === 1) {
        addPriceToSession(data);
        sessionStorage.setItem('asc_pricing', true);
        displayPrice(data);
      }
      else {
        console.log("API is down or something else is going on...");
      }
    });
  })
}

function getPackagePrice(pkgids) {
  pkgids.forEach(pkgid => {
    packageApi(pkgid, function(data){
      //console.log(data);
      if (data !== undefined) {
        if (data.price_per_unit != null){
          addPriceToSession(data, true);
        }
        sessionStorage.setItem('asc_pricing', true);
        displayPackagePrice(data);
      }
      else {
        console.log("API is down or something else is going on...");
      }
    })
  })
}

// creating init funtion in case pricing needs to be called independently from DOM ready
function pricingInit() {
  if (sessionStorage.getItem('asc_pricing')) {
    price_pids.forEach(pid => {
      if (sessionStorage.getItem('pid_'+pid)) {
        const pidData = JSON.parse(sessionStorage.getItem('pid_' + pid))
        const priceDisplay = pidData.amount;
        const priceDollars = pidData.display_dollars;
        const priceCents = pidData.display_cents;
        const origPrice = Math.round((priceDisplay + (priceDisplay * .2)).toFixed(0) / 5) * 5; // adding 20% to current price for display
        [...document.getElementsByClassName("dollars pid-" + pid)].forEach(item => item.innerHTML = priceDollars);
        [...document.getElementsByClassName("cents pid-" + pid)].forEach(item => priceCents !== "00" ? item.innerHTML = priceCents : item.classList.add("display-none"));
        [...document.getElementsByClassName("fullprice pid-" + pid)].forEach(item => item.innerHTML = priceDisplay.toFixed(2));
        [...document.getElementsByClassName("origprice pid-" + pid)].forEach(item => item.innerHTML = origPrice);
        [...document.getElementsByClassName("dollars pid-" + pid)].forEach(item => item.closest(".price").classList.add("shown"));
      }
    })
    price_pkgids.forEach(pkgid => {
      if (sessionStorage.getItem('pkgid_'+pkgid)) {
        const pkgidData = JSON.parse(sessionStorage.getItem('pkgid_' + pkgid))
        const priceDisplay = pkgidData.amount;
        const priceDollars = pkgidData.display_dollars;
        const priceCents = pkgidData.display_cents;
        const discountAmount = pkgidData.discount;
        const origPrice = Math.round((priceDisplay + (priceDisplay * .2)).toFixed(0) / 5) * 5; // adding 20% to current price for display
        [...document.getElementsByClassName("dollars pkgid-" + pkgid)].forEach(item => item.innerHTML = priceDollars);
        [...document.getElementsByClassName("cents pkgid-" + pkgid)].forEach(item => priceCents !== "00" ? item.innerHTML = priceCents : item.classList.add("display-none"));
        [...document.getElementsByClassName("fullprice pkgid-" + pkgid)].forEach(item => item.innerHTML = priceDisplay.toFixed(2));
        [...document.getElementsByClassName("origprice pkgid-" + pkgid)].forEach(item => item.innerHTML = origPrice);
        [...document.getElementsByClassName("dollars pkgid-" + pkgid)].forEach(item => item.closest(".price").classList.add("shown"));
        [...document.getElementsByClassName("savings-amount pkgid-" + pkgid)].forEach(item => item.innerHTML = `$${discountAmount}`);
      }
    })
    getProductPrice(price_pids); // this will make sure that the price is being updated from API even if there's stored pricing
    getPackagePrice(price_pkgids); // this will make sure that the price is being updated from API even if there's stored pricing
  } else {
    getProductPrice(price_pids);
    getPackagePrice(price_pkgids);
  }
  modifyRegUrl();
}
pricingInit();
