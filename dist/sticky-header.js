!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("sticky-header",[],e):"object"==typeof exports?exports["sticky-header"]=e():t["sticky-header"]=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=8)}([function(t,e){function n(t){return null!=t&&"object"==typeof t}t.exports=n},function(t,e,n){function r(t){return null==t?void 0===t?c:a:u&&u in Object(t)?o(t):s(t)}var i=n(3),o=n(12),s=n(13),a="[object Null]",c="[object Undefined]",u=i?i.toStringTag:void 0;t.exports=r},function(t,e){function n(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}t.exports=n},function(t,e,n){var r=n(4),i=r.Symbol;t.exports=i},function(t,e,n){var r=n(10),i="object"==typeof self&&self&&self.Object===Object&&self,o=r||i||Function("return this")();t.exports=o},function(t,e,n){function r(t){return i(t)&&1===t.nodeType&&!o(t)}var i=n(0),o=n(17);t.exports=r},function(t,e,n){function r(t){return"string"==typeof t||!o(t)&&s(t)&&i(t)==a}var i=n(1),o=n(16),s=n(0),a="[object String]";t.exports=r},function(t,e,n){function r(t,e,n){var r=!0,a=!0;if("function"!=typeof t)throw new TypeError(s);return o(n)&&(r="leading"in n?!!n.leading:r,a="trailing"in n?!!n.trailing:a),i(t,e,{leading:r,maxWait:e,trailing:a})}var i=n(15),o=n(2),s="Expected a function";t.exports=r},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=n(7),o=n.n(i),s=n(5),a=n.n(s),c=n(6),u=n.n(c),l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=function(){function t(e){r(this,t),this.scrollPosition=0,this.defaultOptions={header:".sticky-header",wrapper:null,autoHide:!0},this.scrollParent=window,this.header=null,this.autoHide=!0,this.stickClassName="sticky-stick",this.showClassName="sticky-show";var n=Object.assign({},this.defaultOptions,e);if(window.isElement=a.a,n.wrapper&&(a()(n.wrapper)?this.scrollParent=n.wrapper:u()(n.wrapper)&&(this.scrollParent=document.querySelector(n.wrapper))),n.header&&(a()(n.header)?this.header=n.header:u()(n.header)&&(this.header=document.querySelector(n.header))),!this.header)throw new Error("StickyHeader is missing header parameter!");if(!this.scrollParent)throw new Error("StickyHeader is missing scroll parent!");this.autoHide=n.autoHide,this.handleScroll=o()(this.handleScroll.bind(this),10),this.scrollParent.addEventListener("scroll",this.handleScroll),this.scrollPosition=this.calculateScrollPosition(),this.autoHide||this.header.classList.add(this.showClassName)}return l(t,[{key:"handleScroll",value:function(){var t=this.calculateScrollPosition();t<this.scrollPosition?t<=0?this.unfixHeader():this.autoHide&&this.showFixedHeader():(this.autoHide&&this.hideFixedHeader(),t>=this.header.offsetHeight&&this.fixHeader()),this.scrollPosition=t}},{key:"calculateScrollPosition",value:function(){if(a()(this.scrollParent))return this.scrollParent.scrollTop;var t=document.documentElement;return(window.pageYOffset||t.scrollTop)-(t.clientTop||0)}},{key:"fixHeader",value:function(){var t=this;this.header.classList.contains(this.stickClassName)||(this.header.style.transitionDuration="0ms",a()(this.scrollParent)?this.scrollParent.style.paddingTop=this.header.offsetHeight+"px":document.body.style.paddingTop=this.header.offsetHeight+"px",this.header.classList.add(this.stickClassName),setTimeout(function(){t.header.style.transitionDuration=""},500))}},{key:"unfixHeader",value:function(){this.header.classList.contains(this.stickClassName)&&(a()(this.scrollParent)?this.scrollParent.style.paddingTop="":document.body.style.paddingTop="",this.header.style.transitionDuration="0ms",this.header.classList.remove(this.stickClassName),this.autoHide&&this.header.classList.remove(this.showClassName))}},{key:"showFixedHeader",value:function(){this.header.classList.contains(this.stickClassName)&&this.header.classList.add(this.showClassName)}},{key:"hideFixedHeader",value:function(){this.header.classList.contains(this.stickClassName)&&this.header.classList.remove(this.showClassName)}},{key:"destroy",value:function(){removeEventListener("scroll",this.handleScroll)}}]),t}();e.default=f},,function(t,e,n){(function(e){var n="object"==typeof e&&e&&e.Object===Object&&e;t.exports=n}).call(e,n(21))},function(t,e,n){var r=n(14),i=r(Object.getPrototypeOf,Object);t.exports=i},function(t,e,n){function r(t){var e=s.call(t,c),n=t[c];try{t[c]=void 0;var r=!0}catch(t){}var i=a.call(t);return r&&(e?t[c]=n:delete t[c]),i}var i=n(3),o=Object.prototype,s=o.hasOwnProperty,a=o.toString,c=i?i.toStringTag:void 0;t.exports=r},function(t,e){function n(t){return i.call(t)}var r=Object.prototype,i=r.toString;t.exports=n},function(t,e){function n(t,e){return function(n){return t(e(n))}}t.exports=n},function(t,e,n){function r(t,e,n){function r(e){var n=x,r=b;return x=b=void 0,P=e,g=t.apply(r,n)}function l(t){return P=t,j=setTimeout(d,e),k?r(t):g}function f(t){var n=t-O,r=t-P,i=e-n;return H?u(i,w-r):i}function h(t){var n=t-O,r=t-P;return void 0===O||n>=e||n<0||H&&r>=w}function d(){var t=o();if(h(t))return p(t);j=setTimeout(d,f(t))}function p(t){return j=void 0,S&&x?r(t):(x=b=void 0,g)}function v(){void 0!==j&&clearTimeout(j),P=0,x=O=b=j=void 0}function y(){return void 0===j?g:p(o())}function m(){var t=o(),n=h(t);if(x=arguments,b=this,O=t,n){if(void 0===j)return l(O);if(H)return j=setTimeout(d,e),r(O)}return void 0===j&&(j=setTimeout(d,e)),g}var x,b,w,g,j,O,P=0,k=!1,H=!1,S=!0;if("function"!=typeof t)throw new TypeError(a);return e=s(e)||0,i(n)&&(k=!!n.leading,H="maxWait"in n,w=H?c(s(n.maxWait)||0,e):w,S="trailing"in n?!!n.trailing:S),m.cancel=v,m.flush=y,m}var i=n(2),o=n(19),s=n(20),a="Expected a function",c=Math.max,u=Math.min;t.exports=r},function(t,e){var n=Array.isArray;t.exports=n},function(t,e,n){function r(t){if(!s(t)||i(t)!=a)return!1;var e=o(t);if(null===e)return!0;var n=f.call(e,"constructor")&&e.constructor;return"function"==typeof n&&n instanceof n&&l.call(n)==h}var i=n(1),o=n(11),s=n(0),a="[object Object]",c=Function.prototype,u=Object.prototype,l=c.toString,f=u.hasOwnProperty,h=l.call(Object);t.exports=r},function(t,e,n){function r(t){return"symbol"==typeof t||o(t)&&i(t)==s}var i=n(1),o=n(0),s="[object Symbol]";t.exports=r},function(t,e,n){var r=n(4),i=function(){return r.Date.now()};t.exports=i},function(t,e,n){function r(t){if("number"==typeof t)return t;if(o(t))return s;if(i(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=i(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(a,"");var n=u.test(t);return n||l.test(t)?f(t.slice(2),n?2:8):c.test(t)?s:+t}var i=n(2),o=n(18),s=NaN,a=/^\s+|\s+$/g,c=/^[-+]0x[0-9a-f]+$/i,u=/^0b[01]+$/i,l=/^0o[0-7]+$/i,f=parseInt;t.exports=r},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n}])});