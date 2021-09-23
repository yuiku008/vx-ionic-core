var __awaiter=this&&this.__awaiter||function(e,t,n,r){function i(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,o){function a(e){try{s(r.next(e))}catch(t){o(t)}}function u(e){try{s(r["throw"](e))}catch(t){o(t)}}function s(e){e.done?n(e.value):i(e.value).then(a,u)}s((r=r.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var n={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},r,i,o,a;return a={next:u(0),throw:u(1),return:u(2)},typeof Symbol==="function"&&(a[Symbol.iterator]=function(){return this}),a;function u(e){return function(t){return s([e,t])}}function s(a){if(r)throw new TypeError("Generator is already executing.");while(n)try{if(r=1,i&&(o=a[0]&2?i["return"]:a[0]?i["throw"]||((o=i["return"])&&o.call(i),0):i.next)&&!(o=o.call(i,a[1])).done)return o;if(i=0,o)a=[a[0]&2,o.value];switch(a[0]){case 0:case 1:o=a;break;case 4:n.label++;return{value:a[1],done:false};case 5:n.label++;i=a[1];a=[0];continue;case 7:a=n.ops.pop();n.trys.pop();continue;default:if(!(o=n.trys,o=o.length>0&&o[o.length-1])&&(a[0]===6||a[0]===2)){n=0;continue}if(a[0]===3&&(!o||a[1]>o[0]&&a[1]<o[3])){n.label=a[1];break}if(a[0]===6&&n.label<o[1]){n.label=o[1];o=a;break}if(o&&n.label<o[2]){n.label=o[2];n.ops.push(a);break}if(o[2])n.ops.pop();n.trys.pop();continue}a=t.call(e,n)}catch(u){a=[6,u];i=0}finally{r=o=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:true}}};var __spreadArrays=this&&this.__spreadArrays||function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;for(var r=Array(e),i=0,t=0;t<n;t++)for(var o=arguments[t],a=0,u=o.length;a<u;a++,i++)r[i]=o[a];return r};System.register(["./p-0b20bb44.system.js","./p-90f9da43.system.js","./p-b6779b96.system.js"],(function(e){"use strict";var t,n,r,i;return{setters:[function(e){t=e.b;n=e.c},function(e){r=e.g},function(e){i=e.OVERLAY_BACK_BUTTON_PRIORITY}],execute:function(){var o=this;var a=0;var u=e("h",new WeakMap);var s=function(e){return{create:function(t){return y(e,t)},dismiss:function(t,n,r){return k(document,t,n,e,r)},getTop:function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){return[2,S(document,e)]}))}))}}};var c=e("a",s("ion-alert"));var f=e("b",s("ion-action-sheet"));var l=e("l",s("ion-loading"));var d=e("m",s("ion-modal"));var v=e("p",s("ion-picker"));var p=e("c",s("ion-popover"));var h=e("t",s("ion-toast"));var m=e("e",(function(e){if(typeof document!=="undefined"){A(document)}var t=a++;e.overlayIndex=t;if(!e.hasAttribute("id")){e.id="ion-overlay-"+t}}));var y=function(e,t){if(typeof customElements!=="undefined"){return customElements.whenDefined(e).then((function(){var n=document.createElement(e);n.classList.add("overlay-hidden");Object.assign(n,t);P(document).appendChild(n);return n.componentOnReady()}))}return Promise.resolve()};var b='[tabindex]:not([tabindex^="-"]), input:not([type=hidden]):not([tabindex^="-"]), textarea:not([tabindex^="-"]), button:not([tabindex^="-"]), select:not([tabindex^="-"]), .ion-focusable:not([tabindex^="-"])';var _="input:not([type=hidden]), textarea, button, select";var w=function(e,t){var n=e.querySelector(b);var r=n&&n.shadowRoot;if(r){n=r.querySelector(_)||n}if(n){n.focus()}else{t.focus()}};var g=function(e,t){var n=Array.from(e.querySelectorAll(b));var r=n.length>0?n[n.length-1]:null;var i=r&&r.shadowRoot;if(i){r=i.querySelector(_)||r}if(r){r.focus()}else{t.focus()}};var x=function(e,t){var n=S(t);var i=e.target;if(!n||!i){return}if(n===i){n.lastFocus=undefined}else{var o=r(n);if(!o.contains(i)){return}var a=o.querySelector(".ion-overlay-wrapper");if(!a){return}if(a.contains(i)){n.lastFocus=i}else{var u=n.lastFocus;w(a,n);if(u===t.activeElement){g(a,n)}n.lastFocus=t.activeElement}}};var A=function(e){if(a===0){a=1;e.addEventListener("focus",(function(t){return x(t,e)}),true);e.addEventListener("ionBackButton",(function(t){var n=S(e);if(n&&n.backdropDismiss){t.detail.register(i,(function(){return n.dismiss(undefined,C)}))}}));e.addEventListener("keyup",(function(t){if(t.key==="Escape"){var n=S(e);if(n&&n.backdropDismiss){n.dismiss(undefined,C)}}}))}};var k=function(e,t,n,r,i){var o=S(e,r,i);if(!o){return Promise.reject("overlay does not exist")}return o.dismiss(t,n)};var E=function(e,t){if(t===undefined){t="ion-alert,ion-action-sheet,ion-loading,ion-modal,ion-picker,ion-popover,ion-toast"}return Array.from(e.querySelectorAll(t)).filter((function(e){return e.overlayIndex>0}))};var S=function(e,t,n){var r=E(e,t);return n===undefined?r[r.length-1]:r.find((function(e){return e.id===n}))};var q=e("d",(function(e,r,i,a,u){return __awaiter(o,void 0,void 0,(function(){var o,s,c;return __generator(this,(function(f){switch(f.label){case 0:if(e.presented){return[2]}e.presented=true;e.willPresent.emit();o=t(e);s=e.enterAnimation?e.enterAnimation:n.get(r,o==="ios"?i:a);return[4,R(e,s,e.el,u)];case 1:c=f.sent();if(c){e.didPresent.emit()}if(e.el.tagName!=="ION-TOAST"){D(e.el)}if(e.keyboardClose){e.el.focus()}return[2]}}))}))}));var D=function(e){return __awaiter(o,void 0,void 0,(function(){var t,n;return __generator(this,(function(r){switch(r.label){case 0:t=document.activeElement;if(!t){return[2]}n=t&&t.shadowRoot;if(n){t=n.querySelector(_)||t}return[4,e.onDidDismiss()];case 1:r.sent();t.focus();return[2]}}))}))};var L=e("f",(function(e,r,i,a,s,c,f){return __awaiter(o,void 0,void 0,(function(){var o,l,d;return __generator(this,(function(v){switch(v.label){case 0:if(!e.presented){return[2,false]}e.presented=false;v.label=1;case 1:v.trys.push([1,4,,5]);e.el.style.setProperty("pointer-events","none");e.willDismiss.emit({data:r,role:i});o=t(e);l=e.leaveAnimation?e.leaveAnimation:n.get(a,o==="ios"?s:c);if(!(i!=="gesture"))return[3,3];return[4,R(e,l,e.el,f)];case 2:v.sent();v.label=3;case 3:e.didDismiss.emit({data:r,role:i});u.delete(e);return[3,5];case 4:d=v.sent();console.error(d);return[3,5];case 5:e.el.remove();return[2,true]}}))}))}));var P=function(e){return e.querySelector("ion-app")||e.body};var R=function(e,t,r,i){return __awaiter(o,void 0,void 0,(function(){var o,a,s;return __generator(this,(function(c){switch(c.label){case 0:r.classList.remove("overlay-hidden");o=r.shadowRoot||e.el;a=t(o,i);if(!e.animated||!n.getBoolean("animated",true)){a.duration(0)}if(e.keyboardClose){a.beforeAddWrite((function(){var e=r.ownerDocument.activeElement;if(e&&e.matches("input, ion-input, ion-textarea")){e.blur()}}))}s=u.get(e)||[];u.set(e,__spreadArrays(s,[a]));return[4,a.play()];case 1:c.sent();return[2,true]}}))}))};var O=e("g",(function(e,t){var n;var r=new Promise((function(e){return n=e}));T(e,t,(function(e){n(e.detail)}));return r}));var T=function(e,t,n){var r=function(i){e.removeEventListener(t,r);n(i)};e.addEventListener(t,r)};var B=e("i",(function(e){return e==="cancel"||e===C}));var j=function(e){return e()};var I=e("s",(function(e,t){if(typeof e==="function"){var r=n.get("_zoneGate",j);return r((function(){try{return e(t)}catch(n){console.error(n)}}))}return undefined}));var C=e("B","backdrop")}}}));