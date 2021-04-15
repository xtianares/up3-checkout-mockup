// Source: https://gist.github.com/k-gun/c2ea7c49edf7b757fe9561ba37cb19ca
// .classList() Polyfill for older browser - IE9 again...
!function(){function t(t){this.element=t}var e=function(t){return RegExp("(^| )"+t+"( |$)")},n=function(t,e,n){for(var i=0;i<t.length;i++)e.call(n,t[i])}
t.prototype={add:function(){n(arguments,function(t){this.contains(t)||(this.element.className+=" "+t)},this)},remove:function(){n(arguments,function(t){this.element.className=this.element.className.replace(e(t),"")},this)},toggle:function(t){return this.contains(t)?(this.remove(t),!1):(this.add(t),!0)},contains:function(t){return e(t).test(this.element.className)},replace:function(t,e){this.remove(t),this.add(e)}},"classList"in Element.prototype||Object.defineProperty(Element.prototype,"classList",{get:function(){return new t(this)}}),window.DOMTokenList&&null==DOMTokenList.prototype.replace&&(DOMTokenList.prototype.replace=t.prototype.replace)}()

// .closest() Polyfill for browsers that supports document.querySelectorAll() - IE9 again...
if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest =
  function(s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
      i,
      el = this;
    do {
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== el) {};
    } while ((i < 0) && (el = el.parentElement));
    return el;
  }
}

// fetch polyfill for older browser, the minimum needed
self.fetch||(self.fetch=function(e,n){return n=n||{},new Promise(function(t,s){var r=new XMLHttpRequest,o=[],u=[],i={},a=function(){return{ok:2==(r.status/100|0),statusText:r.statusText,status:r.status,url:r.responseURL,text:function(){return Promise.resolve(r.responseText)},json:function(){return Promise.resolve(JSON.parse(r.responseText))},blob:function(){return Promise.resolve(new Blob([r.response]))},clone:a,headers:{keys:function(){return o},entries:function(){return u},get:function(e){return i[e.toLowerCase()]},has:function(e){return e.toLowerCase()in i}}}};for(var c in r.open(n.method||"get",e,!0),r.onload=function(){r.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(e,n,t){o.push(n=n.toLowerCase()),u.push([n,t]),i[n]=i[n]?i[n]+","+t:t}),t(a())},r.onerror=s,r.withCredentials="include"==n.credentials,n.headers)r.setRequestHeader(c,n.headers[c]);r.send(n.body||null)})});
// to check for fetch response...
function checkFetchStatus(response) {
  if (response.status !== 200) {
    console.log('Looks like there was a problem. Status Code: ' + response.status);
    return;
  }
  return response.json()
}
