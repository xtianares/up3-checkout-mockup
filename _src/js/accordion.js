/* requires:
polyfill.js
*/

// accordion Toggle
const accordionActiveClass = "is-open";
const accordionToggleCollection = document.querySelectorAll(".accordion .accordion-toggle");
for (let accordionToggle of accordionToggleCollection) {
  accordionToggle.addEventListener('click', function() {
    const accordionWrap = accordionToggle.closest(".accordion-wrap");
    const accordion = accordionToggle.closest(".accordion");
    if ( !accordion.classList.contains(accordionActiveClass) ) {
      var el = accordionWrap.querySelectorAll(".accordion");
      var i; for (i = 0; i < el.length; i++) {
        el[i].classList.remove(accordionActiveClass)
      }
      accordion.classList.toggle(accordionActiveClass)
    } else
    if ( accordion.classList.contains(accordionActiveClass) ) {
      accordion.classList.remove(accordionActiveClass)
    }
  })
}

