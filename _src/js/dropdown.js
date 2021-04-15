/* requires:
polyfill.js
*/

// Dropdown Select Toggle
const activeClass = "is-active";
const dropdownCollection = document.querySelectorAll(".dropdown-list span.dropdown");
for (let dropdownToggle of dropdownCollection) {
  dropdownToggle.addEventListener('click', function() {
    //console.log(dropdownToggle.classList);
    if ( !dropdownToggle.classList.contains(activeClass) ) {
      var el = document.querySelectorAll(".dropdown-list span.dropdown");
      var i; for (i = 0; i < el.length; i++) {
        el[i].classList.remove(activeClass);
      }
      dropdownToggle.classList.toggle(activeClass);
    } else
    if ( dropdownToggle.classList.contains(activeClass) ) {
      dropdownToggle.classList.remove(activeClass);
    }
  })
}

document.addEventListener('click', function(e) {
  // Dropdown Select Toggle
  var el = document.querySelectorAll(".dropdown-list span.dropdown")
  var e=e? e : window.event;
  var eventElement=e.target;
  if (!eventElement.closest(".dropdown-list")){
    //console.log(event_element.closest(".dropdown-list"));
    var i; for (i = 0; i < el.length; i++) {
      el[i].classList.remove(activeClass);
    }
  }
}, false);
