(()=>{var e={669:(e,t,n)=>{e.exports=n(609)},448:(e,t,n)=>{"use strict";var r=n(867),o=n(26),a=n(372),i=n(327),s=n(97),c=n(109),u=n(985),l=n(61);e.exports=function(e){return new Promise((function(t,n){var f=e.data,d=e.headers;r.isFormData(f)&&delete d["Content-Type"],(r.isBlob(f)||r.isFile(f))&&f.type&&delete d["Content-Type"];var p=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",m=unescape(encodeURIComponent(e.auth.password))||"";d.Authorization="Basic "+btoa(h+":"+m)}var g=s(e.baseURL,e.url);if(p.open(e.method.toUpperCase(),i(g,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p.onreadystatechange=function(){if(p&&4===p.readyState&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in p?c(p.getAllResponseHeaders()):null,a={data:e.responseType&&"text"!==e.responseType?p.response:p.responseText,status:p.status,statusText:p.statusText,headers:r,config:e,request:p};o(t,n,a),p=null}},p.onabort=function(){p&&(n(l("Request aborted",e,"ECONNABORTED",p)),p=null)},p.onerror=function(){n(l("Network Error",e,null,p)),p=null},p.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(l(t,e,"ECONNABORTED",p)),p=null},r.isStandardBrowserEnv()){var b=(e.withCredentials||u(g))&&e.xsrfCookieName?a.read(e.xsrfCookieName):void 0;b&&(d[e.xsrfHeaderName]=b)}if("setRequestHeader"in p&&r.forEach(d,(function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete d[t]:p.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(p.withCredentials=!!e.withCredentials),e.responseType)try{p.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&p.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){p&&(p.abort(),n(e),p=null)})),f||(f=null),p.send(f)}))}},609:(e,t,n)=>{"use strict";var r=n(867),o=n(849),a=n(321),i=n(185);function s(e){var t=new a(e),n=o(a.prototype.request,t);return r.extend(n,a.prototype,t),r.extend(n,t),n}var c=s(n(655));c.Axios=a,c.create=function(e){return s(i(c.defaults,e))},c.Cancel=n(263),c.CancelToken=n(972),c.isCancel=n(502),c.all=function(e){return Promise.all(e)},c.spread=n(713),e.exports=c,e.exports.default=c},263:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},972:(e,t,n)=>{"use strict";var r=n(263);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},502:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},321:(e,t,n)=>{"use strict";var r=n(867),o=n(327),a=n(782),i=n(572),s=n(185);function c(e){this.defaults=e,this.interceptors={request:new a,response:new a}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=s(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[i,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)n=n.then(t.shift(),t.shift());return n},c.prototype.getUri=function(e){return e=s(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,n){return this.request(s(n||{},{method:e,url:t}))}})),r.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,n,r){return this.request(s(r||{},{method:e,url:t,data:n}))}})),e.exports=c},782:(e,t,n)=>{"use strict";var r=n(867);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},97:(e,t,n)=>{"use strict";var r=n(793),o=n(303);e.exports=function(e,t){return e&&!r(t)?o(e,t):t}},61:(e,t,n)=>{"use strict";var r=n(481);e.exports=function(e,t,n,o,a){var i=new Error(e);return r(i,t,n,o,a)}},572:(e,t,n)=>{"use strict";var r=n(867),o=n(527),a=n(502),i=n(655);function s(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return s(e),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||i.adapter)(e).then((function(t){return s(e),t.data=o(t.data,t.headers,e.transformResponse),t}),(function(t){return a(t)||(s(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},481:e=>{"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},185:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t){t=t||{};var n={},o=["url","method","data"],a=["headers","auth","proxy","params"],i=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],s=["validateStatus"];function c(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function u(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(n[o]=c(void 0,e[o])):n[o]=c(e[o],t[o])}r.forEach(o,(function(e){r.isUndefined(t[e])||(n[e]=c(void 0,t[e]))})),r.forEach(a,u),r.forEach(i,(function(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(n[o]=c(void 0,e[o])):n[o]=c(void 0,t[o])})),r.forEach(s,(function(r){r in t?n[r]=c(e[r],t[r]):r in e&&(n[r]=c(void 0,e[r]))}));var l=o.concat(a).concat(i).concat(s),f=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===l.indexOf(e)}));return r.forEach(f,u),n}},26:(e,t,n)=>{"use strict";var r=n(61);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},527:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t,n){return r.forEach(n,(function(n){e=n(e,t)})),e}},655:(e,t,n)=>{"use strict";var r=n(867),o=n(16),a={"Content-Type":"application/x-www-form-urlencoded"};function i(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var s,c={adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(s=n(448)),s),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(i(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(i(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),r.forEach(["post","put","patch"],(function(e){c.headers[e]=r.merge(a)})),e.exports=c},849:e=>{"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},327:(e,t,n)=>{"use strict";var r=n(867);function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var a;if(n)a=n(t);else if(r.isURLSearchParams(t))a=t.toString();else{var i=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),i.push(o(t)+"="+o(e))})))})),a=i.join("&")}if(a){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+a}return e}},303:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},372:(e,t,n)=>{"use strict";var r=n(867);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,a,i){var s=[];s.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),r.isString(o)&&s.push("path="+o),r.isString(a)&&s.push("domain="+a),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},793:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},985:(e,t,n)=>{"use strict";var r=n(867);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},16:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},109:(e,t,n)=>{"use strict";var r=n(867),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,a,i={};return e?(r.forEach(e.split("\n"),(function(e){if(a=e.indexOf(":"),t=r.trim(e.substr(0,a)).toLowerCase(),n=r.trim(e.substr(a+1)),t){if(i[t]&&o.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([n]):i[t]?i[t]+", "+n:n}})),i):i}},713:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},867:(e,t,n)=>{"use strict";var r=n(849),o=Object.prototype.toString;function a(e){return"[object Array]"===o.call(e)}function i(e){return void 0===e}function s(e){return null!==e&&"object"==typeof e}function c(e){if("[object Object]"!==o.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function u(e){return"[object Function]"===o.call(e)}function l(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),a(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:a,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:function(e){return null!==e&&!i(e)&&null!==e.constructor&&!i(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isPlainObject:c,isUndefined:i,isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:u,isStream:function(e){return s(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:l,merge:function e(){var t={};function n(n,r){c(t[r])&&c(n)?t[r]=e(t[r],n):c(n)?t[r]=e({},n):a(n)?t[r]=n.slice():t[r]=n}for(var r=0,o=arguments.length;r<o;r++)l(arguments[r],n);return t},extend:function(e,t,n){return l(t,(function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},44:(e,t,n)=>{"use strict";n.d(t,{Z:()=>d});var r=n(645),o=n.n(r),a=n(667),i=n.n(a),s=n(971),c=n(56),u=o()((function(e){return e[1]})),l=i()(s.Z),f=i()(c.Z);u.push([e.id,"*{margin:0;padding:0;border:0;outline:none;box-sizing:border-box;font-family:Iosevka;color:#e5e5e5}*::-webkit-scrollbar{width:10px}*::-webkit-scrollbar-track{background:none}*::-webkit-scrollbar-thumb{background:#dd83a0;border-radius:20px}body,html{height:100%}@font-face{font-family:Iosevka;src:url("+l+') format("truetype")}@font-face{font-family:Pacifico;src:url('+f+') format("truetype")}*{margin:0;padding:0;border:0;outline:none;box-sizing:border-box;font-family:Iosevka;color:#e5e5e5}*::-webkit-scrollbar{width:10px}*::-webkit-scrollbar-track{background:none}*::-webkit-scrollbar-thumb{background:#dd83a0;border-radius:20px}body,html{height:100%}@font-face{font-family:Iosevka;src:url('+l+') format("truetype")}@font-face{font-family:Pacifico;src:url('+f+') format("truetype")}@keyframes newTask{0%{transform:scale(0)}75%{transform:scale(1.05)}100%{transform:scale(1)}}@keyframes removing{0%{transform:scale(1)}75%{transform:scale(1.05)}100%{transform:scale(0)}}@keyframes pop{0%{transform:scale(1);opacity:0.8}50%{transform:scale(1.01);opacity:1}100%{transform:scale(1);opacity:0.8}}body{background:#1b2128}.content{display:flex;padding:30px 50px;min-height:100%}.content .leftPanel{padding-top:50px;border-right:2px dashed #b877b4;padding-right:50px;min-width:350px;min-height:90vh;position:relative}.content .leftPanel #newTask{display:grid;grid-template-columns:65% 20% 15%;grid-template-areas:"desc desc desc" "hourSlider hourLabel add";border-bottom:2px dashed #b877b4;padding-bottom:20px}.content .leftPanel #newTask #taskDesc{grid-area:desc;background:#212931;border-radius:100px;padding:15px 30px;color:#e5e5e5;font-size:20px;margin-bottom:20px}.content .leftPanel #newTask #hourSlider{grid-area:hourSlider;background:#212931;-webkit-appearance:none;border-radius:100px;overflow:hidden;margin:20px}.content .leftPanel #newTask #hourSlider::-webkit-slider-runnable-track{height:20px;-webkit-appearance:none}.content .leftPanel #newTask #hourSlider::-webkit-slider-thumb{width:20px;-webkit-appearance:none;height:20px;background:#dd83a0;border-radius:100%;box-shadow:-300px 0 0 290px #dd83a0}.content .leftPanel #newTask .hourLabel{grid-area:hourLabel;margin-top:20px;color:#e5e5e5}.content .leftPanel #newTask .hourLabel #hourLabel{float:left;width:30px}.content .leftPanel #newTask #addBtn{grid-area:add;transition:0.2s;background:#85ba86;color:#1b2128;padding:5px;font-size:20px;border-radius:100px;height:30px;width:30px;display:flex;justify-content:center;align-items:center;justify-self:center;align-self:center;opacity:0.8;cursor:pointer}.content .leftPanel #newTask #addBtn:hover{opacity:1;transform:scale(1.1)}.content .leftPanel #groups .group{display:flex;align-items:center;justify-content:center;position:relative;transition:0.5s;background:#212931;margin-top:20px;padding:10px 20px;text-align:center;border-radius:100px;opacity:0.8;cursor:pointer}.content .leftPanel #groups .group:hover{opacity:1}.content .leftPanel #groups .group .groupHours{position:absolute;right:20px}.content .leftPanel #groups .group.pop{animation:0.5s pop}.content .leftPanel #groups .removing{animation:0.5s removing}.content .leftPanel .editUI{position:absolute;top:0px;left:0px;height:100%;width:100%}.content #tasks{padding:0 20px;display:flex;justify-content:center;flex-wrap:wrap;height:fit-content;width:100%}.content #tasks .task{display:grid;grid-template-areas:"activity activity activity" "hours date edit";grid-template-rows:85% 15%;height:180px;width:250px;background:#212931;margin:20px;padding:15px;border-radius:10px}.content #tasks .task .taskDesc{display:flex;overflow-y:scroll;grid-area:activity;border-bottom:1px dashed #b877b4;margin-bottom:10px;padding-right:15px}.content #tasks .task .taskHours{display:flex;justify-content:space-evenly;align-items:center;grid-area:hours;font-size:16px;border-right:1px dashed #b877b4;padding-right:10px}.content #tasks .task .taskDate{display:flex;justify-content:center;align-items:center;grid-area:date;font-size:16px;border-right:1px dashed #b877b4}.content #tasks .task .editElement{transition:0.2s;display:flex;justify-content:center;align-items:center;color:#85ba86;grid-area:edit;font-size:20px;cursor:pointer;opacity:0.8}.content #tasks .task .editElement:hover{opacity:1;transform:scale(1.1)}.content #tasks .task.newTask{animation:0.5s newTask}.content #tasks .task.removing{animation:0.5s removing}\n',""]);const d=u},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=e(t);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var a=0;a<this.length;a++){var i=this[a][0];null!=i&&(o[i]=!0)}for(var s=0;s<e.length;s++){var c=[].concat(e[s]);r&&o[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),t.push(c))}},t}},667:e=>{"use strict";e.exports=function(e,t){return t||(t={}),"string"!=typeof(e=e&&e.__esModule?e.default:e)?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),t.hash&&(e+=t.hash),/["'() \t\n]/.test(e)||t.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e)}},971:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=n.p+"src/fonts/Iosevka.ttf"},56:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=n.p+"src/fonts/Pacifico.ttf"},379:(e,t,n)=>{"use strict";var r,o=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),a=[];function i(e){for(var t=-1,n=0;n<a.length;n++)if(a[n].identifier===e){t=n;break}return t}function s(e,t){for(var n={},r=[],o=0;o<e.length;o++){var s=e[o],c=t.base?s[0]+t.base:s[0],u=n[c]||0,l="".concat(c," ").concat(u);n[c]=u+1;var f=i(l),d={css:s[1],media:s[2],sourceMap:s[3]};-1!==f?(a[f].references++,a[f].updater(d)):a.push({identifier:l,updater:m(d,t),references:1}),r.push(l)}return r}function c(e){var t=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var a=n.nc;a&&(r.nonce=a)}if(Object.keys(r).forEach((function(e){t.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(t);else{var i=o(e.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(t)}return t}var u,l=(u=[],function(e,t){return u[e]=t,u.filter(Boolean).join("\n")});function f(e,t,n,r){var o=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=l(t,o);else{var a=document.createTextNode(o),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(a,i[t]):e.appendChild(a)}}function d(e,t,n){var r=n.css,o=n.media,a=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var p=null,h=0;function m(e,t){var n,r,o;if(t.singleton){var a=h++;n=p||(p=c(t)),r=f.bind(null,n,a,!1),o=f.bind(null,n,a,!0)}else n=c(t),r=d.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=(void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r));var n=s(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<n.length;r++){var o=i(n[r]);a[o].references--}for(var c=s(e,t),u=0;u<n.length;u++){var l=i(n[u]);0===a[l].references&&(a[l].updater(),a.splice(l,1))}n=c}}}}},t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={id:r,exports:{}};return e[r](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{"use strict";var e=n(379),t=n.n(e),r=n(44);t()(r.Z,{insert:"head",singleton:!1}),r.Z.locals;var o,a,i=n(669),s=n.n(i);s().defaults.baseURL="http://localhost:3001",(a=o||(o={})).createGroup=function(e,t,n){var r=document.createElement("div");return r.setAttribute("class","group"),r.setAttribute("id",e+""),r.addEventListener("click",(function(e){var t=e.currentTarget;document.getElementById("tasks").setAttribute("currentGroup",t.id)})),r.innerHTML='\n      <p class="groupDate">'+t+'</p>\n      <p class="groupHours"><span>'+n+"</span> H</p>\n    ",r},a.getGroups=function(){return e=this,t=void 0,r=function(){return function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}}(this,(function(e){return[2,new Promise((function(e,t){s().get("/groups").then((function(t){var n=t.data,r=[];n.map((function(e){r.push(a.createGroup(e.id,e.date,e.hours))})),e(r)})).catch((function(e){t(e)}))}))]}))},new((n=void 0)||(n=Promise))((function(o,a){function i(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}c((r=r.apply(e,t||[])).next())}));var e,t,n,r},a.getGroupByID=function(e){var t,n,r,o=document.getElementById("groups");return Array.from(o.children).map((function(o){if(Number(o.id)!==e)throw new Error("Group not found");t=o.children.item(0).innerHTML,n=Number(o.children.item(1).children.item(0).innerHTML),r=o})),{date:t,hours:n,element:r}},a.deleteGroup=function(e){var t=e.id;s().delete("/groups/delete",{params:{id:t}}).then((function(){e.classList.add("removing"),setTimeout((function(){e.remove()}),500)}))};var c,u=function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}c((r=r.apply(e,t||[])).next())}))},l=function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}};function f(e,t){var n=document.createElement("div"),r=(document.createElement("div"),document.createElement("div")),o=new Date(Number(e.date)),a=o.getDate()+"/"+(o.getMonth()+1)+"/"+o.getFullYear();return r.setAttribute("class","editElement"),r.innerHTML="",r.addEventListener("click",(function(){var e,r,o,a;e=Number(n.id),r=Number(t.groupID),o=document.getElementsByClassName("leftPanel")[0],a=document.createElement("div"),c.getTaskByID(e),c.getTaskByID(r),a.setAttribute("class","editUI"),o.appendChild(a)})),n.setAttribute("class","task newTask"),n.setAttribute("id",t.taskID),n.innerHTML='\n            <div class="taskDesc">'+e.desc+'</div>\n            <div class="taskHours" id="taskHours"><span>'+e.hours+'</span> H</div>\n            <div class="taskDate">'+a+"</div>\n          ",n.appendChild(r),{taskElement:n,formattedDate:a}}s().defaults.baseURL="http://localhost:3001",function(e){e.createTask=function(e){return u(this,void 0,void 0,(function(){var t,n,r;return l(this,(function(o){return t=e.desc,n=e.hours,r=e.date,[2,new Promise((function(o,a){s().post("/tasks/create",{desc:t,hours:n,date:r}).then((function(t){var n=t.data,r=n.group,a=f(e,{taskID:n.id,groupID:n.group}),i=a.taskElement,s=a.formattedDate;o({taskElement:i,group:{id:r,date:s}})})).catch((function(e){a(e)}))}))]}))}))},e.getTasks=function(e){return u(this,void 0,void 0,(function(){return l(this,(function(t){return[2,new Promise((function(t,n){s().get("/tasks",{params:{groupID:e}}).then((function(n){var r=n.data,o=[];r.map((function(n,a){var i=f(n,{taskID:n.id,groupID:e});o.push(i.taskElement),a==Object.keys(r).length-1&&t(o)}))})).catch((function(e){n(e)}))}))]}))}))},e.getTaskByID=function(e){var t,n,r,o,a=document.getElementById("tasks");return Array.from(a.children).map((function(a){Number(a.id)===e&&(t=a.children.item(0).innerHTML,n=Number(a.children.item(1).children.item(0).innerHTML),r=a.children.item(2).innerHTML,o=a)})),{desc:t,hours:n,date:r,element:o}}}(c||(c={})),document.addEventListener("DOMContentLoaded",(function(){var e=document.getElementById("newTask"),t=document.getElementById("taskDesc"),n=document.getElementById("hourSlider"),r=document.getElementById("hourLabel"),a=document.getElementById("tasks"),i=document.getElementById("groups"),s=Number(a.getAttribute("currentGroup")),u=[];new MutationObserver((function(e){e.forEach((function(e){"attributes"==e.type&&(s=Number(a.getAttribute("currentGroup")),c.getTasks(s).then((function(e){a.innerHTML="",e.map((function(e){a.appendChild(e)}))})))}))})).observe(a,{attributes:!0}),c.getTasks(s).then((function(e){e.map((function(e){a.appendChild(e)}))})),o.getGroups().then((function(e){e.forEach((function(e){i.appendChild(e)}))})),n.addEventListener("input",(function(){r.innerHTML=n.value})),e.addEventListener("submit",(function(e){e.preventDefault();var l=t.value,f=Number(n.value),d=new Date;if(s=Number(a.getAttribute("currentGroup")),t.value){var p={desc:l,hours:f,date:d};c.createTask(p).then((function(e){if(!e.taskElement)throw new Error(e.error);if(Array.from(i.children).forEach((function(e){u.push(Number(e.id))})),u.includes(e.group.id)){var t=o.getGroupByID(e.group.id);t.element.classList.add("pop"),t.element.children.item(1).children.item(0).innerHTML=t.hours+p.hours+"",setTimeout((function(){t.element.classList.remove("pop")}),500)}else{var n=o.createGroup(e.group.id,e.group.date,p.hours);i.appendChild(n)}s===e.group.id&&a.appendChild(e.taskElement)})),t.value="",n.value="0",r.innerHTML="0"}}))}))})()})();