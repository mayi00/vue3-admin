import{r as e,b as n,g as t,e as o,u as r,f as a,h as i,n as s,w as u,i as l}from"./@vue-tSB00H7h.js";var c;const d="undefined"!=typeof window,f=e=>"string"==typeof e,p=()=>{},v=d&&(null==(c=null==window?void 0:window.navigator)?void 0:c.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function m(e){return"function"==typeof e?e():r(e)}function O(e){return!!t()&&(o(e),!0)}function y(t,o,r={}){const{immediate:a=!0}=r,i=e(!1);let s=null;function u(){s&&(clearTimeout(s),s=null)}function l(){i.value=!1,u()}function c(...e){u(),i.value=!0,s=setTimeout((()=>{i.value=!1,s=null,t(...e)}),m(o))}return a&&(i.value=!0,d&&c()),O(l),{isPending:n(i),start:c,stop:l}}function b(e){var n;const t=m(e);return null!=(n=null==t?void 0:t.$el)?n:t}const w=d?window:void 0;function g(...e){let n,t,o,r;if(f(e[0])||Array.isArray(e[0])?([t,o,r]=e,n=w):[n,t,o,r]=e,!n)return p;Array.isArray(t)||(t=[t]),Array.isArray(o)||(o=[o]);const a=[],i=()=>{a.forEach((e=>e())),a.length=0},s=u((()=>[b(n),m(r)]),(([e,n])=>{i(),e&&a.push(...t.flatMap((t=>o.map((o=>((e,n,t,o)=>(e.addEventListener(n,t,o),()=>e.removeEventListener(n,t,o)))(e,t,o,n))))))}),{immediate:!0,flush:"post"}),l=()=>{s(),i()};return O(l),l}let I=!1;function h(e,n,t={}){const{window:o=w,ignore:r=[],capture:a=!0,detectIframe:i=!1}=t;if(!o)return;v&&!I&&(I=!0,Array.from(o.document.body.children).forEach((e=>e.addEventListener("click",p))));let s=!0;const u=e=>r.some((n=>{if("string"==typeof n)return Array.from(o.document.querySelectorAll(n)).some((n=>n===e.target||e.composedPath().includes(n)));{const t=b(n);return t&&(e.target===t||e.composedPath().includes(t))}})),l=[g(o,"click",(t=>{const o=b(e);o&&o!==t.target&&!t.composedPath().includes(o)&&(0===t.detail&&(s=!u(t)),s?n(t):s=!0)}),{passive:!0,capture:a}),g(o,"pointerdown",(n=>{const t=b(e);t&&(s=!n.composedPath().includes(t)&&!u(n))}),{passive:!0}),i&&g(o,"blur",(t=>{var r;const a=b(e);"IFRAME"!==(null==(r=o.document.activeElement)?void 0:r.tagName)||(null==a?void 0:a.contains(o.document.activeElement))||n(t)}))].filter(Boolean);return()=>l.forEach((e=>e()))}function E(n,t=!1){const o=e(),r=()=>o.value=Boolean(n());return r(),function(e,n=!0){a()?i(e):n?e():s(e)}(r,t),o}const P="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},A="__vueuse_ssr_handlers__";P[A]=P[A]||{};var N,S,Q=Object.getOwnPropertySymbols,j=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable;function T(e,n,t={}){const o=t,{window:r=w}=o,a=((e,n)=>{var t={};for(var o in e)j.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(null!=e&&Q)for(var o of Q(e))n.indexOf(o)<0&&x.call(e,o)&&(t[o]=e[o]);return t})(o,["window"]);let i;const s=E((()=>r&&"ResizeObserver"in r)),l=()=>{i&&(i.disconnect(),i=void 0)},c=u((()=>b(e)),(e=>{l(),s.value&&r&&e&&(i=new ResizeObserver(n),i.observe(e,a))}),{immediate:!0,flush:"post"}),d=()=>{l(),c()};return O(d),{isSupported:s,stop:d}}(S=N||(N={})).UP="UP",S.RIGHT="RIGHT",S.DOWN="DOWN",S.LEFT="LEFT",S.NONE="NONE";var C=Object.defineProperty,_=Object.getOwnPropertySymbols,k=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable,L=(e,n,t)=>n in e?C(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;function R(n,t,o,r={}){var i,s,c;const{clone:d=!1,passive:f=!1,eventName:p,deep:v=!1,defaultValue:m}=r,O=a(),y=(null==O?void 0:O.emit)||(null==(i=null==O?void 0:O.$emit)?void 0:i.bind(O))||(null==(c=null==(s=null==O?void 0:O.proxy)?void 0:s.$emit)?void 0:c.bind(null==O?void 0:O.proxy));let b=p;b=p||b||"update:".concat(t.toString());const w=e=>{return d?(e=>"function"==typeof e)(d)?d(e):(n=e,JSON.parse(JSON.stringify(n))):e;var n},g=()=>void 0!==n[t]?w(n[t]):m;if(f){const o=g(),r=e(o);return u((()=>n[t]),(e=>r.value=w(e))),u(r,(e=>{(e!==n[t]||v)&&y(b,e)}),{deep:v}),r}return l({get:()=>g(),set(e){y(b,e)}})}((e,n)=>{for(var t in n||(n={}))k.call(n,t)&&L(e,t,n[t]);if(_)for(var t of _(n))B.call(n,t)&&L(e,t,n[t])})({linear:function(e){return e}},{easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]});export{y as a,T as b,R as c,g as d,d as i,h as o,O as t,b as u};
