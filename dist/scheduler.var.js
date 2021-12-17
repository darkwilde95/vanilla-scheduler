var Scheduler;(()=>{"use strict";var e={792:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(81),s=n.n(r),i=n(645),a=n.n(i)()(s());a.push([e.id,'[class^="ssche__"], \r\n[class^="ssche__"] * {\r\n  outline: none;\r\n  box-sizing: content-box;\r\n  font-family: system-ui;\r\n}\r\n\r\n[class^="ssche__"]::-webkit-scrollbar, \r\n[class^="ssche__"] ::-webkit-scrollbar {\r\n  width: 6px;\r\n  height: 6px;\r\n}\r\n\r\n[class^="ssche__"]::-webkit-scrollbar-thumb,\r\n[class^="ssche__"] ::-webkit-scrollbar-thumb {\r\n  border-radius: 8px;\r\n  background-color: rgba(0,0,0,0.5);\r\n}\r\n\r\n.ssche__container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  overflow: hidden;\r\n  min-width: 100%;\r\n  max-width: 100vw;\r\n  position: relative;\r\n  height: 100%;\r\n  max-height: 100vh;\r\n}\r\n\r\n/* ----------------------------------------------------------------------- */\r\n\r\n.ssche__heading, .ssche__heading_controls {\r\n  display: flex;\r\n  flex-direction: row;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  font-family: system-ui;\r\n}\r\n\r\n.ssche__heading {\r\n  position: sticky;\r\n  top: 0;\r\n  padding: 8px;\r\n  z-index: 3;\r\n}\r\n\r\n.ssche__heading h1 {\r\n  margin: 0;\r\n}\r\n\r\n.ssche__btn {\r\n  font-family: system-ui;\r\n  padding: 4px 16px;\r\n  text-transform: uppercase;\r\n  font-size: 16px;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  user-select: none;\r\n}\r\n\r\n.ssche__heading_button {\r\n  background-color: white;\r\n  border: 1px solid #0288d1;\r\n  color: #0288d1;\r\n}\r\n\r\n.ssche__heading_button:hover {\r\n  background-color: #edf8ff;\r\n}\r\n\r\n.ssche__heading_button:active {\r\n  color: white;\r\n  background-color: #0288d1;\r\n}\r\n\r\n.ssche__heading_controls {\r\n  color: #0288d1;\r\n}\r\n\r\n.ssche__control {\r\n  min-width: 32px;\r\n  min-height: 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  margin: 0 8px;\r\n  cursor: pointer;\r\n  padding: 4px 12px;\r\n  user-select: none;\r\n  font-weight: bold;\r\n  border-radius: 2px;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.ssche__control:hover {\r\n  background-color: rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.ssche__control_side {\r\n  border-radius: 50%;\r\n  padding: 0;\r\n  font-size: 18px;\r\n  font-weight: bold;\r\n}\r\n\r\n/*----------------------------------------------------------------------------*/\r\n\r\n.ssche__grid {\r\n  display: grid;\r\n  grid-template-columns: 150px auto;\r\n  grid-template-rows: 40px;\r\n  grid-auto-rows: auto;\r\n  overflow: auto;\r\n  border-collapse: collapse;\r\n  min-width: 100%;\r\n}\r\n\r\n.ssche__grid div.section-label {\r\n  background-color: white;\r\n}\r\n\r\n.ssche__grid div.day-labels, .ssche__grid div.section-label {\r\n  font-weight: 600;\r\n  color: rgba(0, 0, 0, 0.55);\r\n}\r\n\r\n.ssche__grid .ssche__grid-head {\r\n  position: sticky;\r\n  top: 0;\r\n  box-shadow: 4px 4px 4px 0 #00000032;\r\n  z-index: 3;\r\n  background-color: white;\r\n}\r\n\r\n.ssche__grid div.day-labels {\r\n  display: grid;\r\n  grid-template-rows: 40px;\r\n}\r\n\r\n.ssche__grid div.day-labels div {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: flex-end;\r\n  padding-bottom: 8px;\r\n}\r\n\r\n.ssche__grid div.section-label {\r\n  display: flex;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  min-height: 78px;\r\n  padding-left: 16px;\r\n  border: 1px solid #ebeced;\r\n}\r\n\r\n.ssche__grid .ssche__cells {\r\n  position: absolute;\r\n  display: grid;\r\n  grid-auto-rows: auto;\r\n  height: 100%;\r\n  width: 100%;\r\n  border: none;\r\n  z-index: 1;\r\n}\r\n\r\n.ssche__grid .events-container {\r\n  background-color: transparent;\r\n  position: relative;\r\n}\r\n\r\n.ssche__grid .ssche__drag-zone {\r\n  background-color: transparent;\r\n  width: 100%;\r\n  height: 100%;\r\n  position: absolute;\r\n  z-index: 2;\r\n}\r\n\r\n\r\n.ssche__grid .ssche__cells div {\r\n  background-color: white;\r\n  border: 1px solid #ebeced;\r\n}\r\n\r\n/*-----------------------------------------------------------------*/\r\n\r\n.ssche__overlay {\r\n  display: flex;\r\n  background-color: #000000bf;\r\n  position: absolute;\r\n  top: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  left: 0;\r\n  justify-content: center;\r\n  align-items: center;\r\n  z-index: 4;\r\n}\r\n\r\n.ssche__modal_body {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 500px;\r\n  background-color: white;\r\n  border-radius: 2px;\r\n  box-shadow: 4px 4px 4px 0 #0000001a;\r\n  z-index: 5;\r\n}\r\n\r\n.ssche__modal_title {\r\n  margin: 0;\r\n  padding: 4px 12px;\r\n  font-family: system-ui;\r\n  background-color: #0288d1;\r\n  color: white;\r\n  font-weight: normal;\r\n}\r\n\r\n.ssche__modal_content {\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 16px;\r\n}\r\n\r\n.ssche__modal_form_row {\r\n  display: flex;\r\n  flex-direction: row;\r\n  align-items: flex-start;\r\n  margin-top: 24px;\r\n  font-family: system-ui;\r\n}\r\n\r\n.ssche__modal_input_label {\r\n  min-width: 100px;\r\n  text-align: right;\r\n  margin-right: 24px;\r\n  font-weight: 600;\r\n  color: rgba(0, 0, 0, 0.75);\r\n}\r\n\r\n.ssche__modal_input {\r\n  width: 100%;\r\n  padding: 8px;\r\n  font-family: system-ui;\r\n}\r\n\r\n.ssche__modal_double_row {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n}\r\n\r\n.ssche__modal_range_row {\r\n  display: flex;\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.ssche__modal_range_row .ssche__range-input {\r\n  margin-right: 16px;\r\n}\r\n\r\n.ssche__modal_actions {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: flex-end;\r\n  margin-top: 16px;\r\n}\r\n\r\n.ssche__modal_btn_cancel {\r\n  margin-right: 16px;\r\n  border: none;\r\n  background-color: transparent;\r\n  color: #0288d1;\r\n  border-radius: 2px;\r\n}\r\n\r\n.ssche__modal_btn_save {\r\n  border: none;\r\n  background-color: #0288d1;\r\n  color: white;\r\n  border-radius: 2px;\r\n}\r\n\r\n.ssche__modal_btn_delete {\r\n  border: none;\r\n  color: #ff584c;\r\n  border-radius: 2px;\r\n  background-color: white;\r\n}\r\n\r\n.ssche__modal_btn_cancel:hover {\r\n  background-color: #d9edf8; \r\n}\r\n\r\n.ssche__modal_btn_save:hover {\r\n  background-color: #0299EB;\r\n}\r\n\r\n.ssche__modal_btn_save:disabled {\r\n  background-color: #0079bb;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.ssche__modal_btn_delete:hover {\r\n  background-color: #ff584c4d;\r\n}\r\n\r\n/* -------------------------------------------------------------------------------- */\r\n\r\n.ssche__event {\r\n  display: flex;\r\n  align-items: center;\r\n  padding: 0 16px;\r\n  height: 24px;\r\n  min-height: 24px;\r\n  background-color: #0288d1;\r\n  color: white;\r\n  border-radius: 5px;\r\n  font-size: 14px;\r\n  cursor: pointer;\r\n  box-sizing: border-box;\r\n  margin-bottom: 2px;\r\n  position: absolute;\r\n}\r\n.ssche__event span {\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  user-select: none;\r\n}',""]);const o=a},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,s,i){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(r)for(var o=0;o<this.length;o++){var l=this[o][0];null!=l&&(a[l]=!0)}for(var d=0;d<e.length;d++){var c=[].concat(e[d]);r&&a[c[0]]||(void 0!==i&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=i),n&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=n):c[2]=n),s&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=s):c[4]="".concat(s)),t.push(c))}},t}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var i={},a=[],o=0;o<e.length;o++){var l=e[o],d=r.base?l[0]+r.base:l[0],c=i[d]||0,h="".concat(d," ").concat(c);i[d]=c+1;var u=n(h),m={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==u)t[u].references++,t[u].updater(m);else{var g=s(m,r);r.byIndex=o,t.splice(o,0,{identifier:h,updater:g,references:1})}a.push(h)}return a}function s(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,s){var i=r(e=e||[],s=s||{});return function(e){e=e||[];for(var a=0;a<i.length;a++){var o=n(i[a]);t[o].references--}for(var l=r(e,s),d=0;d<i.length;d++){var c=n(i[d]);0===t[c].references&&(t[c].updater(),t.splice(c,1))}i=l}}},569:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,s&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var i=n.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(r){var s=t[r];if(void 0!==s)return s.exports;var i=t[r]={id:r,exports:{}};return e[r](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};(()=>{n.d(r,{default:()=>p});var e=n(379),t=n.n(e),s=n(795),i=n.n(s),a=n(569),o=n.n(a),l=n(565),d=n.n(l),c=n(216),h=n.n(c),u=n(589),m=n.n(u),g=n(792),b={};b.styleTagTransform=m(),b.setAttributes=d(),b.insert=o().bind(null,"head"),b.domAPI=i(),b.insertStyleElement=h(),t()(g.Z,b),g.Z&&g.Z.locals&&g.Z.locals;const p=class{constructor(e){Object.defineProperty(this,"onlyRead",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"cellWidth",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"createCallback",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"deleteCallback",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"editCallback",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"eventDraggedCallback",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"sections",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"totalDays",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"title",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"lang",{enumerable:!0,configurable:!0,writable:!0,value:"en"}),Object.defineProperty(this,"currentMonth",{enumerable:!0,configurable:!0,writable:!0,value:(new Date).getMonth()}),Object.defineProperty(this,"currentYear",{enumerable:!0,configurable:!0,writable:!0,value:(new Date).getFullYear()}),Object.defineProperty(this,"rootId",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"events",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"drawnEvents",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"eventDragging",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"langs",{enumerable:!0,configurable:!0,writable:!0,value:{en:{months:["January","February","March","April","May","June","July","August","September","October","November","December"],actions:{create:"Create",save:"Save",cancel:"Cancel",present:"Present",delete:"Delete"},labels:{description:"Description",section:"Section",period:"Time period"}},es:{months:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],actions:{create:"Crear",save:"Guardar",cancel:"Cancelar",present:"Presente",delete:"Borrar"},labels:{description:"Descripción",section:"Sección",period:"Periodo de tiempo"}}}}),Object.defineProperty(this,"getTextLang",{enumerable:!0,configurable:!0,writable:!0,value:e=>this.lang in this.langs?this.langs[this.lang][e]:(console.warn(`Lang: ${this.lang} is not available. Fallback lang: 'en'`),this.langs.en[e])}),Object.defineProperty(this,"closeModalEvent",{enumerable:!0,configurable:!0,writable:!0,value:e=>{"Escape"===e.key&&this.closeModal()}}),Object.defineProperty(this,"appendSelectOptions",{enumerable:!0,configurable:!0,writable:!0,value:(e,t)=>{const n=document.createElement("option");n.innerText="-",n.value="",t.appendChild(n),e.forEach((e=>{const n=document.createElement("option");n.innerText=e.label,n.value=e.id,t.appendChild(n)}))}}),Object.defineProperty(this,"openModal",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=document.getElementsByTagName("body")[0],n=document.createElement("div");n.id=`${this.rootId}-modal`,n.classList.add("ssche__overlay"),n.innerHTML=`\n      <div class="ssche__modal_body">\n        <h2 class="ssche__modal_title">\n          ${this.getTextLang("actions").create}\n        </h2>\n        <div class="ssche__modal_content">\n          <div class="ssche__modal_form_row">\n            <label for="${this.rootId}-description" class="ssche__modal_input_label">\n              ${this.getTextLang("labels").description}\n            </label>\n            <textarea \n              rows="6"\n              id="${this.rootId}-description" \n              class="ssche__modal_input"\n              ></textarea>\n          </div>\n          <div class="ssche__modal_form_row">\n            <label for="${this.rootId}-section" class="ssche__modal_input_label">\n              ${this.getTextLang("labels").section}\n            </label>\n            <select \n              id="${this.rootId}-section" \n              class="ssche__modal_input"\n            ></select>\n          </div>\n          <div class="ssche__modal_form_row">\n            <label class="ssche__modal_input_label">\n              ${this.getTextLang("labels").period}\n            </label>\n            <div class="ssche__modal_double_row">\n              <div class="ssche__modal_range_row">\n                <input id="${this.rootId}-start-time" type="time" class="ssche__range-input" />\n                <input id="${this.rootId}-start-date" type="date" class="ssche" />\n              </div>\n              <div class="ssche__modal_range_row">\n                <input id="${this.rootId}-end-time" type="time" class="ssche__range-input"/>\n                <input id="${this.rootId}-end-date" type="date" class="ssche" />\n              </div>\n            </div>\n          </div>\n          <div class="ssche__modal_actions">\n          ${e&&!this.onlyRead?`\n            <button class="ssche__btn ssche__modal_btn_delete" id="${this.rootId}-modal-delete">\n              ${this.getTextLang("actions").delete}\n            </button>`:""}\n            <button class="ssche__btn ssche__modal_btn_cancel" id="${this.rootId}-modal-cancel">\n              ${this.getTextLang("actions").cancel}\n            </button>\n            ${this.onlyRead?"":`\n            <button class="ssche__btn ssche__modal_btn_save" id="${this.rootId}-modal-save">\n              ${this.getTextLang("actions").save}\n            </button>`}\n          </div>\n        </div>\n      </div>\n    `,t.appendChild(n),this.appendSelectOptions(this.sections,document.getElementById(`${this.rootId}-section`)),n.addEventListener("click",(e=>{e.target.id===`${this.rootId}-modal`&&this.closeModal()}));const r=document.getElementById(`${this.rootId}-modal-cancel`);r.addEventListener("click",this.closeModal,!0),this.onlyRead&&(r.style.marginRight="0px"),document.addEventListener("keydown",this.closeModalEvent,!0);const s=document.getElementById(`${this.rootId}-description`),i=document.getElementById(`${this.rootId}-section`),a=document.getElementById(`${this.rootId}-start-date`),o=document.getElementById(`${this.rootId}-end-date`),l=document.getElementById(`${this.rootId}-start-time`),d=document.getElementById(`${this.rootId}-end-time`),c=document.getElementById(`${this.rootId}-modal-save`);if(this.onlyRead)s.disabled=!0,i.disabled=!0,l.disabled=!0,a.disabled=!0,d.disabled=!0,o.disabled=!0;else{const t=()=>{c.disabled=""===a.value||""===o.value||""===i.value||""===s.value};a.addEventListener("change",(e=>{o.min=e.target.value,t()})),o.addEventListener("change",(e=>{a.max=e.target.value,t()})),i.addEventListener("change",t),s.addEventListener("input",t),l.addEventListener("change",(e=>{const t=e.target.value;d.min=t;const n=new Date(0,0,0,+t.split(":")[0],+t.split(":")[1]);new Date(0,0,0,+d.value.split(":")[0],+d.value.split(":")[1]).getTime()<n.getTime()&&(d.value="")})),t(),c.addEventListener("click",(()=>{const t={description:s.value,section:i.value,startTime:l.value,startDate:a.value,endTime:d.value,endDate:o.value};if(e){if(t.id=e.id,!this.editCallback)throw new Error("Callback 'onEventEdited' isn't defined.");this.editCallback(e,t)}else{if(!this.createCallback)throw new Error("Callback 'onEventCreated' isn't defined.");this.createCallback(t)}this.closeModal()}))}e&&(s.value=e.description,i.value=e.section,a.value=e.startDate,o.value=e.endDate,a.max=e.endDate,o.min=e.startDate,l.value=e.startTime,d.value=e.endTime,l.max=e.endTime,d.min=e.startTime,!this.onlyRead)&&(document.getElementById(`${this.rootId}-modal-delete`).addEventListener("click",(()=>{if(!this.deleteCallback)throw new Error("Callback 'onEventDeleted' isn't defined.");this.deleteCallback(e),this.closeModal()})),c.disabled=!1)}}),Object.defineProperty(this,"closeModal",{enumerable:!0,configurable:!0,writable:!0,value:()=>{const e=document.getElementsByTagName("body")[0],t=document.getElementById(`${this.rootId}-modal`);t&&e.removeChild(t),document.removeEventListener("keydown",this.closeModalEvent,!0)}}),Object.defineProperty(this,"isDrawableNow",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=new Date(this.currentYear,this.currentMonth,1).getTime(),n=new Date(this.currentYear,this.currentMonth+1,0).getTime(),r=e.start<t&&e.end>t,s=e.start>=t&&e.end<=n,i=e.start<=n&&e.end>n;return r||s||i}}),Object.defineProperty(this,"updateScheduler",{enumerable:!0,configurable:!0,writable:!0,value:()=>{this.title&&(this.title.innerText=`${this.getTextLang("months")[this.currentMonth]} ${this.currentYear}`);const e=document.getElementById(`${this.rootId}-grid`);if(!this.rootId)throw new Error("Root HTML Element doesn't exists.");{const t=document.getElementById(this.rootId);if(t&&e){e&&t.removeChild(e);const n=new Date(this.currentYear,this.currentMonth+1,0);this.totalDays=n.getDate();const r=document.createElement("div");r.innerHTML='\n          <div class="ssche__grid-head"></div>\n          <div class="ssche__grid-head day-labels"></div>\n        ',r.classList.add("ssche__grid"),r.id=`${this.rootId}-grid`,t.append(r),this.createGrid(),this.drawnEvents={},this.events.filter((e=>this.isDrawableNow(e))).forEach((e=>{this.drawnEvents[e.id]=e,this.drawEvent(e)}))}}}}),Object.defineProperty(this,"createHeading",{enumerable:!0,configurable:!0,writable:!0,value:()=>{const e=document.getElementById(`${this.rootId}-heading`);e&&(e.innerHTML=`\n        ${this.onlyRead?"<div></div>":`\n        <button id="${this.rootId}-btn-create" class="ssche__btn ssche__heading_button">\n          ${this.langs[this.lang].actions.create}\n        </button>`}\n        <h1 id="${this.rootId}-title">${this.getTextLang("months")[this.currentMonth]} ${this.currentYear}</h1>\n        <div class="ssche__heading_controls">\n          <div id="${this.rootId}-left-control" class="ssche__control ssche__control_side">\n            &#129136;\n          </div>\n          <div id="${this.rootId}-present-control" class="ssche__control">\n            ${this.getTextLang("actions").present}\n          </div>\n          <div id="${this.rootId}-right-control" class="ssche__control ssche__control_side">\n            &#129138;\n          </div>\n        </div>\n      `),this.onlyRead||document.getElementById(`${this.rootId}-btn-create`).addEventListener("click",(()=>this.openModal())),this.title=document.getElementById(`${this.rootId}-title`),document.getElementById(`${this.rootId}-left-control`).addEventListener("click",(()=>{this.currentMonth-=1,this.currentMonth<0&&(this.currentMonth=11,this.currentYear-=1),this.updateScheduler()})),document.getElementById(`${this.rootId}-right-control`).addEventListener("click",(()=>{this.currentMonth+=1,this.currentMonth>11&&(this.currentMonth=0,this.currentYear+=1),this.updateScheduler()})),document.getElementById(`${this.rootId}-present-control`).addEventListener("click",(()=>{const e=new Date;this.currentMonth=e.getMonth(),this.currentYear=e.getFullYear(),this.updateScheduler()}))}}),Object.defineProperty(this,"createGrid",{enumerable:!0,configurable:!0,writable:!0,value:()=>{const e=document.getElementById(`${this.rootId}-grid`);this.sections.forEach((t=>{const n=document.createElement("div");n.classList.add("section-label"),n.innerText=t.label;const r=document.createElement("div");r.classList.add("events-container"),r.style.position="relative",e.appendChild(n),e.appendChild(r)}));const t=e.getElementsByClassName("day-labels")[0];t.style.gridTemplateColumns=`repeat(${this.totalDays}, minmax(40px, 1fr))`;for(let e=0;e<this.totalDays;e++){const n=document.createElement("div");n.innerText=`${e+1}`,t.appendChild(n)}Array.from(e.getElementsByClassName("events-container")).forEach((e=>{const t=document.createElement("div"),n=document.createElement("div");t.classList.add("ssche__cells"),t.style.gridTemplateColumns=`repeat(${this.totalDays}, minmax(40px, 1fr))`,n.classList.add("ssche__drag-zone");for(let e=0;e<this.totalDays;e++)t.appendChild(document.createElement("div"));e.appendChild(n),e.appendChild(t)}));const n=document.getElementsByClassName("ssche__cells")[0].childNodes[0];this.cellWidth=n.getClientRects()[0].width,window.addEventListener("resize",(()=>{const t=document.getElementsByClassName("ssche__cells")[0].childNodes[0];this.cellWidth=t.getClientRects()[0].width,Array.from(e.getElementsByClassName("ssche__event")).forEach((e=>{this.calcLeftSize(this.drawnEvents[e.dataset.id]);const{left:t,size:n}=this.calcLeftSize(this.drawnEvents[e.dataset.id]);e.style.left=`${t}px`,e.style.width=`${n}px`}))}))}}),Object.defineProperty(this,"computeEvent",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=this.sections.map((e=>e.id)).indexOf(e.section),n=e.startDate.split("-"),r=e.endDate.split("-"),s=new Date(+n[0],+n[1]-1,+n[2]),i=new Date(+r[0],+r[1]-1,+r[2]+1);return{id:e.id||"",eventFormData:e,section:t,startDay:s.getDate(),endDay:i.getDate(),start:s.getTime(),end:i.getTime()}}}),Object.defineProperty(this,"calcTop",{enumerable:!0,configurable:!0,writable:!0,value:(e,t)=>{if(0===t.length)return 2;const n=t.reduce(((t,n)=>{if(n.id===e.id)return t;const r=n.start<e.start&&n.end>e.start,s=n.start>=e.start&&n.end<=e.end,i=n.start<e.start&&n.end>e.end,a=n.start<e.end&&n.end>e.end;return r||a||s||i?[...t,n]:t}),[]),r=document.getElementById(`${this.rootId}-grid`),s=n.reduce(((e,t)=>{const n=null==r?void 0:r.querySelector(`div.ssche__event[data-id="${t.id}"]`);if(null===n)return e;const s=n.style.top,i=+s.substring(0,s.length-2);return[...e,i-2]}),[]).sort(((e,t)=>e-t));if(0===s.length)return 2;if(0!==s[0])return 2;for(let e=1;e<s.length;e++)if(s[e]>s[e-1]+26)return s[e-1]+28;return s[s.length-1]+28}}),Object.defineProperty(this,"calcLeftSize",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=new Date(this.currentYear,this.currentMonth,1).getTime(),n=new Date(this.currentYear,this.currentMonth+1,0).getTime(),r=e.start<t?0:e.startDay-1,s=(e.end>n?this.totalDays:e.endDay-1)-r,i=this.cellWidth*s-1;return{left:r*this.cellWidth+1,size:i>0?i:this.cellWidth}}}),Object.defineProperty(this,"drawEvent",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=document.getElementById(`${this.rootId}-grid`);if(!t)throw new Error("Grid doesn't exists.");{const n=document.createElement("div");n.innerHTML=`<span>${e.eventFormData.description}</span>`,n.classList.add("ssche__event"),n.dataset.id=`${e.eventFormData.id}`,n.addEventListener("dblclick",(()=>this.openModal(e.eventFormData)));const{left:r,size:s}=this.calcLeftSize(e);n.style.left=`${r}px`,n.style.width=`${s}px`,t.getElementsByClassName("ssche__drag-zone")[e.section].appendChild(n),this.updateVertical(e.section),this.addDragging(n)}}}),Object.defineProperty(this,"updateVertical",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=document.getElementById(`${this.rootId}-grid`),n=null==t?void 0:t.getElementsByClassName("ssche__drag-zone")[e],r=Array.from(null==n?void 0:n.getElementsByClassName("ssche__event"));r.sort(((e,t)=>{const n=this.drawnEvents[e.dataset.id],r=this.drawnEvents[t.dataset.id];return r.end-r.start-(n.end-n.start)}));const s=[];let i=0;r.forEach((e=>{let t=0;t=this.calcTop(this.drawnEvents[e.dataset.id],s),e.style.top=`${t}px`,s.push(this.drawnEvents[e.dataset.id]),i<t&&(i=t)})),(null==n?void 0:n.parentNode).style.minHeight=`${i+26}px`}}),Object.defineProperty(this,"addDragging",{enumerable:!0,configurable:!0,writable:!0,value:e=>{let t=!1,n=!1,r=0,s=0;const i=document.getElementById(`${this.rootId}-grid`),a=Array.from(null==i?void 0:i.getElementsByClassName("ssche__drag-zone")),o=Object.assign({},this.drawnEvents[e.dataset.id].eventFormData),l=()=>{var e;(t||n)&&this.eventDraggedCallback&&this.eventDraggedCallback(o,this.drawnEvents[null===(e=this.eventDragging)||void 0===e?void 0:e.dataset.id].eventFormData),this.eventDragging=null,a.forEach((e=>{e.onmousemove=null})),document.removeEventListener("mouseup",l)},d=(i,a)=>{i.onmousemove=i=>{var o;const l=this.drawnEvents[e.dataset.id],d=i||window.event,c=i.target;if(i.preventDefault(),s=r-d.clientX,Math.abs(s)>this.cellWidth){r=d.clientX;const e=Math.round(s/this.cellWidth),n=new Date(l.start),i=new Date(l.end);n.setDate(n.getDate()-e),i.setDate(i.getDate()-e),l.start=n.getTime(),l.startDay=n.getDate(),l.end=i.getTime(),l.endDay=i.getDate();const a=n.toISOString();i.setDate(i.getDate()-1);const o=i.toISOString();l.eventFormData.startDate=a.substring(0,a.indexOf("T")),l.eventFormData.endDate=o.substring(0,o.indexOf("T")),t=!0}const h=c.classList.contains("ssche__drag-zone"),u=null===(o=this.eventDragging)||void 0===o?void 0:o.parentNode;if(h&&c!==u&&(u.removeChild(this.eventDragging),c.appendChild(this.eventDragging),this.updateVertical(l.section),l.section=a,l.eventFormData.section=this.sections[a].id,n=!0),t||n){const{left:r,size:s}=this.calcLeftSize(l);e.style.left=`${r}px`,e.style.width=`${s}px`,this.updateVertical(l.section),t=!1,n=!1}},document.addEventListener("mouseup",l)};e.onmousedown=t=>{(t=t||window.event).preventDefault(),r=t.clientX,this.eventDragging=e,a.forEach(((e,t)=>{d(e,t)}))}}}),Object.defineProperty(this,"onEventCreated",{enumerable:!0,configurable:!0,writable:!0,value:e=>{this.createCallback=e}}),Object.defineProperty(this,"onEventDeleted",{enumerable:!0,configurable:!0,writable:!0,value:e=>{this.deleteCallback=e}}),Object.defineProperty(this,"onEventEdited",{enumerable:!0,configurable:!0,writable:!0,value:e=>{this.editCallback=e}}),Object.defineProperty(this,"onEventUpdatedByDrag",{enumerable:!0,configurable:!0,writable:!0,value:e=>{this.eventDraggedCallback=e}}),Object.defineProperty(this,"addEvent",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=this.computeEvent(e);this.events.push(t),this.isDrawableNow(t)&&(this.drawnEvents[t.id]=t,this.drawEvent(t))}}),Object.defineProperty(this,"removeEvent",{enumerable:!0,configurable:!0,writable:!0,value:e=>{if(null===e)throw new Error(`Id not valid: ${e}`);{const t=document.getElementById(`${this.rootId}-grid`),n=null==t?void 0:t.querySelector(`div.ssche__event[data-id="${e}"]`);if(null===n)throw new Error(`No events with id: ${e}`);{const t=n.parentElement,r=this.drawnEvents[e].section;this.events=this.events.filter((t=>t.id!==e)),delete this.drawnEvents[e],t.removeChild(n),this.updateVertical(r)}}}}),this.rootId=e.root,this.onlyRead=e.onlyRead||!1;const t=document.getElementById(this.rootId);if(this.sections=e.sections,e.lang&&(this.lang=e.lang),!t)throw new Error("Root HTML Element doesn't exists.");t.classList.add("ssche__container");const n=new Date(this.currentYear,this.currentMonth+1,0);this.totalDays=n.getDate(),t.innerHTML=`\n      <div id="${this.rootId}-heading" class="ssche__heading"></div>\n      <div id="${this.rootId}-grid" class="ssche__grid">\n        <div class="ssche__grid-head"></div>\n        <div class="ssche__grid-head day-labels"></div>\n      </div>\n    `,this.createHeading(),this.createGrid()}}})(),Scheduler=r.default})();