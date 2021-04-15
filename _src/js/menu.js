/* requires:
polyfill.js
*/

// for active menu highlighting
(function(){
  const a = document.getElementById('nav').getElementsByTagName("a");
  // let loc;
  // if (window.location.href.substr(location.href.length - 1, 1) == '/') {
  //   loc = window.location.href + 'index.html';
  // } else {
  //   loc = window.location.href;
  // }
  let loc = window.location.href;
  for(var i=0; i < a.length; i++) {
    if (a[i].href == loc) {
      a[i].classList.add('is-active');
    }
  }
})();

document.getElementById('nav').querySelector('ul').insertAdjacentHTML("beforebegin", "<span id='menutoggle'><span>Menu</span></span>");
const menuToggle = document.getElementById("menutoggle");
const activeClass = "is-active"

menuToggle.onclick = function(event) {
  menuToggle.classList.toggle(activeClass);
  //menuToggle.nextSibling.classList.toggle(activeClass);
  var el = document.querySelectorAll("#nav span.submenu, #nav a.submenu, #nav ul.submenu");
  var i; for (i = 0; i < el.length; i++) {
    el[i].classList.remove(activeClass);
  }
  event.preventDefault();
};

for (let submenuToggle of document.querySelectorAll("#nav span.submenu, #nav a.submenu")) {
  submenuToggle.addEventListener('click', function() {
    if ( menuToggle.offsetWidth > 0 && menuToggle.offsetHeight > 0 ) { // if the #menuToggle is visible
      submenuToggle.classList.toggle(activeClass);
    }
  })
}

function hideMenu() {
  var el = document.querySelectorAll("#menutoggle, #menutoggle + ul, #nav span.submenu, #nav a.submenu, #nav ul.submenu");
  var i; for (i = 0; i < el.length; i++) {
    el[i].classList.remove(activeClass);
  }
}

document.addEventListener('click', function(e) {
  if ( menuToggle.offsetWidth > 0 && menuToggle.offsetHeight > 0 ) { // if the #menuToggle is visible
    var e=e? e : window.event;
    var eventElement=e.target;
    if (!eventElement.closest("#nav")){
      //console.log(event_element.closest("#nav"));
      if (menuToggle.classList.contains(activeClass)) {
        hideMenu();
      }
    }
  }
}, false);

var resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    if ( menuToggle.offsetWidth <= 0 && menuToggle.offsetHeight <=  0 ) { // if the #menuToggle is hidden
      hideMenu();
    }
  }, 250);
}, false);
