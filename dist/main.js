(()=>{var e={669:(e,t,n)=>{e.exports=n(609)},448:(e,t,n)=>{"use strict";var r=n(867),o=n(26),i=n(372),a=n(327),s=n(97),c=n(109),u=n(985),d=n(61);e.exports=function(e){return new Promise((function(t,n){var l=e.data,p=e.headers;r.isFormData(l)&&delete p["Content-Type"],(r.isBlob(l)||r.isFile(l))&&l.type&&delete p["Content-Type"];var f=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",m=unescape(encodeURIComponent(e.auth.password))||"";p.Authorization="Basic "+btoa(h+":"+m)}var g=s(e.baseURL,e.url);if(f.open(e.method.toUpperCase(),a(g,e.params,e.paramsSerializer),!0),f.timeout=e.timeout,f.onreadystatechange=function(){if(f&&4===f.readyState&&(0!==f.status||f.responseURL&&0===f.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in f?c(f.getAllResponseHeaders()):null,i={data:e.responseType&&"text"!==e.responseType?f.response:f.responseText,status:f.status,statusText:f.statusText,headers:r,config:e,request:f};o(t,n,i),f=null}},f.onabort=function(){f&&(n(d("Request aborted",e,"ECONNABORTED",f)),f=null)},f.onerror=function(){n(d("Network Error",e,null,f)),f=null},f.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(d(t,e,"ECONNABORTED",f)),f=null},r.isStandardBrowserEnv()){var b=(e.withCredentials||u(g))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;b&&(p[e.xsrfHeaderName]=b)}if("setRequestHeader"in f&&r.forEach(p,(function(e,t){void 0===l&&"content-type"===t.toLowerCase()?delete p[t]:f.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(f.withCredentials=!!e.withCredentials),e.responseType)try{f.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&f.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&f.upload&&f.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){f&&(f.abort(),n(e),f=null)})),l||(l=null),f.send(l)}))}},609:(e,t,n)=>{"use strict";var r=n(867),o=n(849),i=n(321),a=n(185);function s(e){var t=new i(e),n=o(i.prototype.request,t);return r.extend(n,i.prototype,t),r.extend(n,t),n}var c=s(n(655));c.Axios=i,c.create=function(e){return s(a(c.defaults,e))},c.Cancel=n(263),c.CancelToken=n(972),c.isCancel=n(502),c.all=function(e){return Promise.all(e)},c.spread=n(713),e.exports=c,e.exports.default=c},263:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},972:(e,t,n)=>{"use strict";var r=n(263);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},502:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},321:(e,t,n)=>{"use strict";var r=n(867),o=n(327),i=n(782),a=n(572),s=n(185);function c(e){this.defaults=e,this.interceptors={request:new i,response:new i}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=s(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[a,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)n=n.then(t.shift(),t.shift());return n},c.prototype.getUri=function(e){return e=s(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,n){return this.request(s(n||{},{method:e,url:t}))}})),r.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,n,r){return this.request(s(r||{},{method:e,url:t,data:n}))}})),e.exports=c},782:(e,t,n)=>{"use strict";var r=n(867);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},97:(e,t,n)=>{"use strict";var r=n(793),o=n(303);e.exports=function(e,t){return e&&!r(t)?o(e,t):t}},61:(e,t,n)=>{"use strict";var r=n(481);e.exports=function(e,t,n,o,i){var a=new Error(e);return r(a,t,n,o,i)}},572:(e,t,n)=>{"use strict";var r=n(867),o=n(527),i=n(502),a=n(655);function s(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return s(e),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||a.adapter)(e).then((function(t){return s(e),t.data=o(t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(s(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},481:e=>{"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},185:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t){t=t||{};var n={},o=["url","method","data"],i=["headers","auth","proxy","params"],a=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],s=["validateStatus"];function c(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function u(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(n[o]=c(void 0,e[o])):n[o]=c(e[o],t[o])}r.forEach(o,(function(e){r.isUndefined(t[e])||(n[e]=c(void 0,t[e]))})),r.forEach(i,u),r.forEach(a,(function(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(n[o]=c(void 0,e[o])):n[o]=c(void 0,t[o])})),r.forEach(s,(function(r){r in t?n[r]=c(e[r],t[r]):r in e&&(n[r]=c(void 0,e[r]))}));var d=o.concat(i).concat(a).concat(s),l=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===d.indexOf(e)}));return r.forEach(l,u),n}},26:(e,t,n)=>{"use strict";var r=n(61);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},527:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t,n){return r.forEach(n,(function(n){e=n(e,t)})),e}},655:(e,t,n)=>{"use strict";var r=n(867),o=n(16),i={"Content-Type":"application/x-www-form-urlencoded"};function a(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var s,c={adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(s=n(448)),s),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(a(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(a(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),r.forEach(["post","put","patch"],(function(e){c.headers[e]=r.merge(i)})),e.exports=c},849:e=>{"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},327:(e,t,n)=>{"use strict";var r=n(867);function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(r.isURLSearchParams(t))i=t.toString();else{var a=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),a.push(o(t)+"="+o(e))})))})),i=a.join("&")}if(i){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}},303:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},372:(e,t,n)=>{"use strict";var r=n(867);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,i,a){var s=[];s.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),r.isString(o)&&s.push("path="+o),r.isString(i)&&s.push("domain="+i),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},793:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},985:(e,t,n)=>{"use strict";var r=n(867);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},16:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},109:(e,t,n)=>{"use strict";var r=n(867),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,a={};return e?(r.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(a[t]&&o.indexOf(t)>=0)return;a[t]="set-cookie"===t?(a[t]?a[t]:[]).concat([n]):a[t]?a[t]+", "+n:n}})),a):a}},713:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},867:(e,t,n)=>{"use strict";var r=n(849),o=Object.prototype.toString;function i(e){return"[object Array]"===o.call(e)}function a(e){return void 0===e}function s(e){return null!==e&&"object"==typeof e}function c(e){if("[object Object]"!==o.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function u(e){return"[object Function]"===o.call(e)}function d(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),i(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:function(e){return null!==e&&!a(e)&&null!==e.constructor&&!a(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isPlainObject:c,isUndefined:a,isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:u,isStream:function(e){return s(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:d,merge:function e(){var t={};function n(n,r){c(t[r])&&c(n)?t[r]=e(t[r],n):c(n)?t[r]=e({},n):i(n)?t[r]=n.slice():t[r]=n}for(var r=0,o=arguments.length;r<o;r++)d(arguments[r],n);return t},extend:function(e,t,n){return d(t,(function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},44:(e,t,n)=>{"use strict";n.d(t,{Z:()=>p});var r=n(645),o=n.n(r),i=n(667),a=n.n(i),s=n(971),c=n(56),u=o()((function(e){return e[1]})),d=a()(s.Z),l=a()(c.Z);u.push([e.id,"*{margin:0;padding:0;border:0;outline:none;box-sizing:border-box;font-family:Iosevka;color:#e5e5e5}*::-webkit-scrollbar{width:10px}*::-webkit-scrollbar-track{background:none}*::-webkit-scrollbar-thumb{background:#dd83a0;border-radius:20px}body,html{height:100%}@font-face{font-family:Iosevka;src:url("+d+') format("truetype")}@font-face{font-family:Pacifico;src:url('+l+') format("truetype")}*{margin:0;padding:0;border:0;outline:none;box-sizing:border-box;font-family:Iosevka;color:#e5e5e5}*::-webkit-scrollbar{width:10px}*::-webkit-scrollbar-track{background:none}*::-webkit-scrollbar-thumb{background:#dd83a0;border-radius:20px}body,html{height:100%}@font-face{font-family:Iosevka;src:url('+d+') format("truetype")}@font-face{font-family:Pacifico;src:url('+l+') format("truetype")}@keyframes newTask{0%{transform:scale(0)}75%{transform:scale(1.05)}100%{transform:scale(1)}}@keyframes removing{0%{transform:scale(1)}75%{transform:scale(1.05)}100%{transform:scale(0)}}@keyframes pop{0%{transform:scale(1);opacity:0.8}50%{transform:scale(1.01);opacity:1}100%{transform:scale(1);opacity:0.8}}@keyframes editTask{0%{top:100vh;transform:scale(0.5)}50%{top:0;transform:scale(0.5)}100%{top:0;transform:scale(1);backdrop-filter:blur(2px)}}body{background:#1b2128}.content{display:flex;padding:30px 50px;min-height:100%}.content .leftPanel{padding-top:50px;border-right:2px dashed #b877b4;padding-right:50px;min-width:350px;min-height:90vh;position:relative}.content .leftPanel #newTask{display:grid;grid-template-columns:65% 20% 15%;grid-template-areas:"desc desc desc"\r "hourSlider hourLabel add";border-bottom:2px dashed #b877b4;padding-bottom:20px}.content .leftPanel #newTask #taskDesc{grid-area:desc;background:#212931;border-radius:100px;padding:15px 30px;color:#e5e5e5;font-size:20px;margin-bottom:20px}.content .leftPanel #newTask #hourSlider{grid-area:hourSlider;background:#212931;-webkit-appearance:none;border-radius:100px;overflow:hidden;margin:20px;border:5px solid #212931}.content .leftPanel #newTask #hourSlider::-webkit-slider-runnable-track{height:20px;-webkit-appearance:none}.content .leftPanel #newTask #hourSlider::-webkit-slider-thumb{width:20px;-webkit-appearance:none;height:20px;background:#dd83a0;border-radius:100%;box-shadow:-300px 0 0 290px #dd83a0}.content .leftPanel #newTask .hourLabel{grid-area:hourLabel;margin-top:20px;color:#e5e5e5}.content .leftPanel #newTask .hourLabel #hourLabel{float:left;width:30px}.content .leftPanel #newTask #addBtn{grid-area:add;transition:0.2s;background:#85ba86;color:#1b2128;padding:5px;font-size:20px;border-radius:100px;height:30px;width:30px;display:flex;justify-content:center;align-items:center;justify-self:center;align-self:center;opacity:0.8;cursor:pointer}.content .leftPanel #newTask #addBtn:hover{opacity:1;transform:scale(1.1)}.content .leftPanel #groups .group{display:flex;align-items:center;justify-content:center;position:relative;transition:0.5s;background:#212931;margin-top:20px;padding:10px 20px;text-align:center;border-radius:100px;opacity:0.8;cursor:pointer}.content .leftPanel #groups .group:hover{opacity:1}.content .leftPanel #groups .group .groupHours{position:absolute;right:20px}.content .leftPanel #groups .group.pop{animation:0.5s pop}.content .leftPanel #groups .removing{animation:0.5s removing}.content #tasks{padding:0 20px;display:flex;justify-content:center;flex-wrap:wrap;height:fit-content;width:100%}.content #tasks .task{display:grid;grid-template-areas:"activity activity activity activity"\r "hours date edit delete";grid-template-rows:85% 15%;height:180px;width:260px;background:#212931;margin:20px;padding:15px;border-radius:10px}.content #tasks .task .taskDesc{display:flex;overflow-y:scroll;grid-area:activity;border-bottom:1px dashed #b877b4;margin-bottom:10px;padding-right:15px}.content #tasks .task .taskHours{display:flex;justify-content:space-evenly;align-items:center;grid-area:hours;font-size:16px;border-right:1px dashed #b877b4;padding-right:10px}.content #tasks .task .taskDate{display:flex;justify-content:center;align-items:center;grid-area:date;font-size:16px;border-right:1px dashed #b877b4}.content #tasks .task .editElement{transition:0.2s;display:flex;justify-content:center;align-items:center;color:#85ba86;grid-area:edit;font-size:20px;cursor:pointer;opacity:0.8}.content #tasks .task .editElement:hover{opacity:1;transform:scale(1.1)}.content #tasks .task .deleteElement{transition:0.2s;display:flex;justify-content:center;align-items:center;color:#e25987;grid-area:delete;font-size:20px;cursor:pointer;opacity:0.8}.content #tasks .task .deleteElement:hover{opacity:1;transform:scale(1.1)}.content #tasks .task.newTask{animation:0.5s newTask}.content #tasks .task.removing{animation:0.5s removing}.content .editUI{position:fixed;top:0px;left:0px;height:100%;width:100%;animation:0.7s editTask ease-in-out;backdrop-filter:blur(2px);border-radius:0px;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(2px)}.content .editUI .editPanel{display:grid;background:#212931;border-radius:10px;padding:30px;grid-template-columns:50% 50%;grid-template-rows:55px 90px auto 40px}.content .editUI .editPanel #editTaskDesc{grid-column-start:1;grid-column-end:3;grid-row:1;background:#1b2128;border-radius:100px;padding:15px 30px;color:#e5e5e5;font-size:20px}.content .editUI .editPanel .hours{grid-column-start:1;grid-column-end:3;grid-row:2;display:flex;justify-content:space-evenly;align-items:center}.content .editUI .editPanel .hours #editHourSlider{background:#1b2128;-webkit-appearance:none;border-radius:100px;overflow:hidden;width:230px}.content .editUI .editPanel .hours #editHourSlider::-webkit-slider-runnable-track{height:20px;-webkit-appearance:none}.content .editUI .editPanel .hours #editHourSlider::-webkit-slider-thumb{width:20px;-webkit-appearance:none;height:20px;background:#dd83a0;border-radius:100%;box-shadow:-300px 0 0 290px #dd83a0}.content .editUI .editPanel .hours .editHourLabel{color:#e5e5e5;width:50px}.content .editUI .editPanel .hours .editHourLabel #hourLabel{float:left;width:30px}.content .editUI .editPanel #editBtn{transition:0.5s;cursor:pointer;padding:10px 60px;background:#85ba86;font-size:30px;border-radius:100px;grid-column:2;grid-row:4;margin-left:20px;display:flex;justify-content:center;align-items:center;opacity:0.8}.content .editUI .editPanel #editBtn:hover{opacity:1}.content .editUI .editPanel #exitBtn{transition:0.5s;cursor:pointer;padding:10px 60px;background:#e25987;font-size:30px;border-radius:100px;grid-column:1;grid-row:4;margin-right:20px;display:flex;justify-content:center;align-items:center;opacity:0.8}.content .editUI .editPanel #exitBtn:hover{opacity:1}.content .editUI .editPanel .calendar{grid-column-start:1;grid-column-end:3;grid-row-start:3;grid-row-end:3;background:#1b2128;margin-bottom:30px;border-radius:10px;display:grid;grid-template-columns:repeat(7, 1fr);overflow:hidden;padding:10px}.content .editUI .editPanel .calendar .day{transition:0.5s ease-out;border-radius:10px;display:flex;justify-content:center;align-items:center;height:50px;width:50px;cursor:pointer;margin:2.5px}.content .editUI .editPanel .calendar .day:hover{background:#85ba86}.content .editUI .editPanel .calendar .day.selected{background-color:#63aec0;border-radius:10px;color:#212931}.content .editUI.closing{animation:0.5s removing}\n',""]);const p=u},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=e(t);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var s=0;s<e.length;s++){var c=[].concat(e[s]);r&&o[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),t.push(c))}},t}},667:e=>{"use strict";e.exports=function(e,t){return t||(t={}),"string"!=typeof(e=e&&e.__esModule?e.default:e)?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),t.hash&&(e+=t.hash),/["'() \t\n]/.test(e)||t.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e)}},971:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=n.p+"src/fonts/Iosevka.ttf"},56:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=n.p+"src/fonts/Pacifico.ttf"},379:(e,t,n)=>{"use strict";var r,o=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),i=[];function a(e){for(var t=-1,n=0;n<i.length;n++)if(i[n].identifier===e){t=n;break}return t}function s(e,t){for(var n={},r=[],o=0;o<e.length;o++){var s=e[o],c=t.base?s[0]+t.base:s[0],u=n[c]||0,d="".concat(c," ").concat(u);n[c]=u+1;var l=a(d),p={css:s[1],media:s[2],sourceMap:s[3]};-1!==l?(i[l].references++,i[l].updater(p)):i.push({identifier:d,updater:m(p,t),references:1}),r.push(d)}return r}function c(e){var t=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var i=n.nc;i&&(r.nonce=i)}if(Object.keys(r).forEach((function(e){t.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(t);else{var a=o(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var u,d=(u=[],function(e,t){return u[e]=t,u.filter(Boolean).join("\n")});function l(e,t,n,r){var o=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=d(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function p(e,t,n){var r=n.css,o=n.media,i=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var f=null,h=0;function m(e,t){var n,r,o;if(t.singleton){var i=h++;n=f||(f=c(t)),r=l.bind(null,n,i,!1),o=l.bind(null,n,i,!0)}else n=c(t),r=p.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=(void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r));var n=s(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<n.length;r++){var o=a(n[r]);i[o].references--}for(var c=s(e,t),u=0;u<n.length;u++){var d=a(n[u]);0===i[d].references&&(i[d].updater(),i.splice(d,1))}n=c}}}}},t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={id:r,exports:{}};return e[r](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{"use strict";var e=n(379),t=n.n(e),r=n(44);t()(r.Z,{insert:"head",singleton:!1}),r.Z.locals;var o,i=n(669),a=n.n(i);a().defaults.baseURL="http://localhost:3001",function(e){e.createGroup=function(e,t,n){var r=document.createElement("div");return r.setAttribute("class","group"),r.setAttribute("id",e+""),r.addEventListener("click",(function(e){var t=e.currentTarget;document.getElementById("tasks").setAttribute("currentGroup",t.id)})),r.innerHTML='\n      <p class="groupDate">'+t+'</p>\n      <p class="groupHours"><span>'+n+"</span> H</p>\n    ",r},e.getGroups=function(){return t=this,n=void 0,o=function(){return function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}}(this,(function(t){return[2,new Promise((function(t,n){a().get("/groups").then((function(n){var r=n.data,o=[];r.sort((function(e,t){return Number(new Date(e.date))-Number(new Date(t.date))})).map((function(t){o.push(e.createGroup(t.id,t.date,t.hours))})),t(o)})).catch((function(e){n(e)}))}))]}))},new((r=void 0)||(r=Promise))((function(e,i){function a(e){try{c(o.next(e))}catch(e){i(e)}}function s(e){try{c(o.throw(e))}catch(e){i(e)}}function c(t){var n;t.done?e(t.value):(n=t.value,n instanceof r?n:new r((function(e){e(n)}))).then(a,s)}c((o=o.apply(t,n||[])).next())}));var t,n,r,o},e.getGroupByID=function(e){var t,n,r,o=document.getElementById("groups");return Array.from(o.children).map((function(o){Number(o.id)===e&&(t=o.children.item(0).innerHTML,n=Number(o.children.item(1).children.item(0).innerHTML),r=o)})),{date:t,hours:n,element:r}},e.deleteGroup=function(e){var t=e.id;a().delete("/groups/delete",{params:{id:t}}).then((function(){e.classList.add("removing"),setTimeout((function(){e.remove()}),500)}))}}(o||(o={}));var s,c=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function s(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}c((r=r.apply(e,t||[])).next())}))},u=function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};function d(e,t){var n=document.createElement("div"),r=document.createElement("div"),i=document.createElement("div"),c=new Date(Number(e.date)),u=c.getDate()+"/"+(c.getMonth()+1)+"/"+c.getFullYear();return i.setAttribute("class","editElement"),i.innerHTML="",i.addEventListener("click",(function(){!function(e,t){var n=document.getElementsByClassName("content")[0],r=document.getElementById("tasks"),i=document.createElement("div"),a=document.createElement("form"),c=s.getTaskByID(e),u=function(e){var t=document.createElement("div");t.setAttribute("class","calendar"),t.innerHTML="";for(var n=e.date,r=new Date(n.getFullYear(),n.getMonth(),1),o=new Date(n.getFullYear(),n.getMonth()+1,0).getDate(),i=r.getDay(),a=0;a<i;a++)t.innerHTML+='\n      <div class="blankDay"></div>\n    ';var s=function(e){var r=document.createElement("div");r.classList.add("day"),r.innerHTML=e+1+"",r.addEventListener("click",(function(){document.getElementsByClassName("selected")[0].classList.remove("selected"),r.classList.add("selected")})),e===n.getDate()-1&&r.classList.add("selected"),(e+1+i)%7&&r.classList.add("border"),t.appendChild(r)};for(a=0;a<o;a++)s(a);return t}(c);i.setAttribute("class","editUI"),a.setAttribute("class","editPanel"),a.innerHTML='\n    <input type="text" id="editTaskDesc" spellcheck="false" value="'+c.desc+'"/>\n    <div class="hours">\n      <input\n        value="'+c.hours+'"\n        type="range"\n        id="editHourSlider"\n        step="0.5"\n        max="8"\n        min="0,5"\n      />\n      <p class="editHourLabel"><span id="editHourLabel">'+c.hours+'</span> H</p>\n    </div>\n    <button id="editBtn" type="submit">✔</button>\n    <button id="exitBtn">✖</button>\n  ',a.appendChild(u),i.appendChild(a),n.appendChild(i);var d=document.getElementById("editTaskDesc"),l=document.getElementById("editHourSlider"),p=document.getElementById("editHourLabel"),f=document.getElementById("exitBtn");l.addEventListener("input",(function(){p.innerHTML=l.value})),f.addEventListener("click",(function(e){e.preventDefault(),i.classList.add("closing"),setTimeout((function(){i.remove()}),500)})),a.addEventListener("submit",(function(n){n.preventDefault();var a=document.getElementById("groups"),u=c.date.getDate(),p=Number(document.getElementsByClassName("selected")[0].innerHTML),f=new Date(c.date.setDate(p));s.editTask(e,f,d.value,Number(l.value)).then((function(e){var n=o.getGroupByID(e),i=o.getGroupByID(t),s=i.element.children.item(1).children.item(0),d=f.getDate()+"/"+(f.getMonth()+1)+"/"+f.getFullYear();if(c.element.getElementsByClassName("taskHours")[0].innerHTML=l.value+" H",n.element)n.element.classList.add("pop"),n.element.children.item(1).children.item(0).innerHTML=n.hours+Number(l.value)+"",setTimeout((function(){n.element.classList.remove("pop")}),500);else{var h=o.createGroup(e,d,Number(l.value));a.appendChild(h)}p!==u&&(c.element.classList.add("removing"),setTimeout((function(){c.element.remove(),s.innerHTML=i.hours-Number(l.value)+"",""===r.innerHTML&&o.deleteGroup(i.element)}),500))})),i.classList.add("closing"),setTimeout((function(){i.remove()}),500)}))}(Number(n.id),t.groupID)})),r.setAttribute("class","deleteElement"),r.innerHTML="",r.addEventListener("click",(function(){var e,r;e=Number(n.id),r=t.groupID,a().delete("/tasks/delete",{params:{taskID:e}}).then((function(){var t=document.getElementById("tasks"),n=s.getTaskByID(e),i=o.getGroupByID(r);n.element.classList.add("removing"),setTimeout((function(){n.element.remove();var e=i.element.children.item(1).children.item(0),r=Number(e.innerHTML);e.innerHTML=r-n.hours+"",""===t.innerHTML&&o.deleteGroup(i.element)}),500)}))})),n.setAttribute("class","task newTask"),n.setAttribute("id",t.taskID),n.innerHTML='\n            <div class="taskDesc">'+e.desc+'</div>\n            <div class="taskHours" id="taskHours"><span>'+e.hours+'</span> H</div>\n            <div class="taskDate">'+u+"</div>\n          ",n.appendChild(i),n.appendChild(r),{taskElement:n,formattedDate:u}}a().defaults.baseURL="http://localhost:3001",function(e){e.createTask=function(e){return c(this,void 0,void 0,(function(){var t,n,r;return u(this,(function(o){return t=e.desc,n=e.hours,r=e.date,[2,new Promise((function(o,i){a().post("/tasks/create",{desc:t,hours:n,date:r}).then((function(t){var n=t.data,r=n.group,i=d(e,{taskID:n.id,groupID:n.group}),a=i.taskElement,s=i.formattedDate;o({taskElement:a,group:{id:r,date:s}})})).catch((function(e){i(e)}))}))]}))}))},e.getTasks=function(e){return c(this,void 0,void 0,(function(){return u(this,(function(t){return[2,new Promise((function(t,n){a().get("/tasks",{params:{groupID:e}}).then((function(n){var r=n.data,o=[];r.map((function(n,i){var a=d(n,{taskID:n.id,groupID:e});o.push(a.taskElement),i==Object.keys(r).length-1&&t(o)}))})).catch((function(e){n(e)}))}))]}))}))},e.getTaskByID=function(e){var t,n,r,o,i=document.getElementById("tasks").children;return Array.from(i).map((function(i){if(Number(i.id)===e){var a=i.children.item(2).innerHTML.split("/");t=i.children.item(0).innerHTML,n=Number(i.children.item(1).children.item(0).innerHTML),r=new Date(a[1]+" "+a[0]+" "+a[2]),o=i}})),{desc:t,hours:n,date:r,element:o}},e.editTask=function(e,t,n,r){return c(this,void 0,void 0,(function(){return u(this,(function(o){return[2,new Promise((function(o,i){a().post("/tasks/update",{id:e,date:t,desc:n,hours:r}).then((function(e){var t=e.data;o(t)})).catch((function(e){i(e)}))}))]}))}))}}(s||(s={})),document.addEventListener("DOMContentLoaded",(function(){var e=document.getElementById("newTask"),t=document.getElementById("taskDesc"),n=document.getElementById("hourSlider"),r=document.getElementById("hourLabel"),i=document.getElementById("tasks"),a=document.getElementById("groups"),c=Number(i.getAttribute("currentGroup")),u=[];new MutationObserver((function(e){e.forEach((function(e){"attributes"==e.type&&(c=Number(i.getAttribute("currentGroup")),s.getTasks(c).then((function(e){i.innerHTML="",e.map((function(e){i.appendChild(e)}))})))}))})).observe(i,{attributes:!0}),s.getTasks(c).then((function(e){e.map((function(e){i.appendChild(e)}))})),o.getGroups().then((function(e){e.forEach((function(e){a.appendChild(e)}))})),n.addEventListener("input",(function(){r.innerHTML=n.value})),e.addEventListener("submit",(function(e){e.preventDefault();var d=t.value,l=Number(n.value),p=new Date;if(c=Number(i.getAttribute("currentGroup")),t.value){var f={desc:d,hours:l,date:p};s.createTask(f).then((function(e){if(!e.taskElement)throw new Error(e.error);if(Array.from(a.children).forEach((function(e){u.push(Number(e.id))})),u.includes(e.group.id)){var t=o.getGroupByID(e.group.id);t.element.classList.add("pop"),t.element.children.item(1).children.item(0).innerHTML=t.hours+f.hours+"",setTimeout((function(){t.element.classList.remove("pop")}),500)}else{var n=o.createGroup(e.group.id,e.group.date,f.hours);a.appendChild(n)}c===e.group.id&&i.appendChild(e.taskElement)})),t.value="",n.value="0",r.innerHTML="0"}}))}))})()})();