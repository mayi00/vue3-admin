var e,t=["scroll","wheel","touchstart","touchmove","touchenter","touchend","touchleave","mouseout","mouseleave","mouseup","mousedown","mousemove","mouseenter","mousewheel","mouseover"];if(function(){var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){e=!0}});window.addEventListener("test",null,t),window.removeEventListener("test",null,t)}catch(o){}return e}()){var o=EventTarget.prototype.addEventListener;e=o,EventTarget.prototype.addEventListener=function(o,r,n){var s,a,i,v="object"==typeof n&&null!==n,u=v?n.capture:n;(n=v?(a=n,i=Object.getOwnPropertyDescriptor(a,"passive"),i&&!0!==i.writable&&void 0===i.set?Object.assign({},a):a):{}).passive=void 0!==(s=n.passive)?s:-1!==t.indexOf(o)&&!0,n.capture=void 0!==u&&u,e.call(this,o,r,n)},EventTarget.prototype.addEventListener._original=e}
