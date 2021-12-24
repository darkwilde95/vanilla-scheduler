var Scheduler;(()=>{"use strict";var e={792:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(81),s=n.n(r),i=n(645),o=n.n(i)()(s());o.push([e.id,'[class^="ssche__"], \r\n[class^="ssche__"] * {\r\n  outline: none;\r\n  box-sizing: content-box;\r\n  font-family: system-ui;\r\n}\r\n\r\n[class^="ssche__"]::-webkit-scrollbar, \r\n[class^="ssche__"] ::-webkit-scrollbar {\r\n  width: 6px;\r\n  height: 6px;\r\n}\r\n\r\n[class^="ssche__"]::-webkit-scrollbar-thumb,\r\n[class^="ssche__"] ::-webkit-scrollbar-thumb {\r\n  border-radius: 8px;\r\n  background-color: rgba(0,0,0,0.5);\r\n}\r\n\r\n.ssche__container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  overflow: hidden;\r\n  min-width: 100%;\r\n  max-width: 100vw;\r\n  position: relative;\r\n  height: 100%;\r\n  max-height: 100vh;\r\n}\r\n\r\n/* ----------------------------------------------------------------------- */\r\n\r\n.ssche__heading, .ssche__heading_controls {\r\n  display: flex;\r\n  flex-direction: row;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  font-family: system-ui;\r\n}\r\n\r\n.ssche__heading {\r\n  position: sticky;\r\n  top: 0;\r\n  padding: 8px;\r\n  z-index: 3;\r\n}\r\n\r\n.ssche__heading h1 {\r\n  margin: 0;\r\n}\r\n\r\n.ssche__btn {\r\n  font-family: system-ui;\r\n  padding: 4px 16px;\r\n  text-transform: uppercase;\r\n  font-size: 16px;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  user-select: none;\r\n}\r\n\r\n.ssche__heading_button {\r\n  background-color: white;\r\n  border: 1px solid #0288d1;\r\n  color: #0288d1;\r\n}\r\n\r\n.ssche__heading_button:hover {\r\n  background-color: #edf8ff;\r\n}\r\n\r\n.ssche__heading_button:active, \r\n.ssche__button-active, \r\n.ssche__button-active:hover {\r\n  color: white;\r\n  background-color: #0288d1;\r\n}\r\n\r\n.ssche__heading_controls {\r\n  color: #0288d1;\r\n}\r\n\r\n.ssche__control {\r\n  min-width: 32px;\r\n  min-height: 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  margin: 0 8px;\r\n  cursor: pointer;\r\n  padding: 4px 12px;\r\n  user-select: none;\r\n  font-weight: bold;\r\n  border-radius: 2px;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.ssche__control:hover {\r\n  background-color: rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.ssche__control_side {\r\n  border-radius: 50%;\r\n  padding: 0;\r\n  font-size: 18px;\r\n  font-weight: bold;\r\n}\r\n\r\n/*----------------------------------------------------------------------------*/\r\n\r\n.ssche__grid {\r\n  display: grid;\r\n  grid-template-columns: 150px auto;\r\n  grid-template-rows: 40px;\r\n  grid-auto-rows: auto;\r\n  overflow: auto;\r\n  border-collapse: collapse;\r\n  min-width: 100%;\r\n}\r\n\r\n.ssche__grid div.section-label {\r\n  background-color: white;\r\n}\r\n\r\n.ssche__grid div.day-labels, .ssche__grid div.section-label {\r\n  font-weight: 600;\r\n  color: rgba(0, 0, 0, 0.55);\r\n}\r\n\r\n.ssche__grid .ssche__grid-head {\r\n  position: sticky;\r\n  top: 0;\r\n  box-shadow: 4px 4px 4px 0 #00000032;\r\n  z-index: 3;\r\n  background-color: white;\r\n}\r\n\r\n.ssche__grid div.day-labels {\r\n  display: grid;\r\n  grid-template-rows: 40px;\r\n}\r\n\r\n.ssche__grid div.day-labels div {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: flex-end;\r\n  padding-bottom: 8px;\r\n}\r\n\r\n.ssche__grid div.section-label {\r\n  display: flex;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  min-height: 78px;\r\n  padding-left: 16px;\r\n  border: 1px solid #ebeced;\r\n}\r\n\r\n.ssche__grid .ssche__cells {\r\n  position: absolute;\r\n  display: grid;\r\n  grid-auto-rows: auto;\r\n  height: 100%;\r\n  width: 100%;\r\n  border: none;\r\n  z-index: 1;\r\n}\r\n\r\n.ssche__grid .events-container {\r\n  background-color: transparent;\r\n  position: relative;\r\n}\r\n\r\n.ssche__grid .ssche__drag-zone {\r\n  background-color: transparent;\r\n  width: 100%;\r\n  height: 100%;\r\n  position: absolute;\r\n  z-index: 2;\r\n}\r\n\r\n\r\n.ssche__grid .ssche__cells div {\r\n  background-color: white;\r\n  border: 1px solid #ebeced;\r\n}\r\n\r\n/*-----------------------------------------------------------------*/\r\n\r\n.ssche__overlay {\r\n  display: flex;\r\n  background-color: #000000bf;\r\n  position: absolute;\r\n  top: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  left: 0;\r\n  justify-content: center;\r\n  align-items: center;\r\n  z-index: 4;\r\n}\r\n\r\n.ssche__modal_body {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 500px;\r\n  background-color: white;\r\n  border-radius: 2px;\r\n  box-shadow: 4px 4px 4px 0 #0000001a;\r\n  z-index: 5;\r\n  max-height: 80%;\r\n  overflow-y: auto;\r\n  overflow-x: hidden;\r\n}\r\n\r\n.ssche__modal_title {\r\n  margin: 0;\r\n  padding: 4px 12px;\r\n  font-family: system-ui;\r\n  background-color: #0288d1;\r\n  color: white;\r\n  font-weight: normal;\r\n}\r\n\r\n.ssche__modal_content {\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 16px;\r\n}\r\n\r\n.ssche__modal_form_row {\r\n  display: flex;\r\n  flex-direction: row;\r\n  align-items: flex-start;\r\n  margin-top: 24px;\r\n  font-family: system-ui;\r\n}\r\n\r\n.ssche__modal_input_label {\r\n  min-width: 100px;\r\n  text-align: right;\r\n  margin-right: 24px;\r\n  font-weight: 600;\r\n  color: rgba(0, 0, 0, 0.75);\r\n}\r\n\r\n.ssche__modal_input {\r\n  width: 100%;\r\n  padding: 8px;\r\n  font-family: system-ui;\r\n}\r\n\r\n.ssche__modal_multi_row {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n}\r\n\r\n.ssche__modal_range_row {\r\n  display: flex;\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.ssche__modal_range_row .ssche__range-input {\r\n  margin-right: 16px;\r\n}\r\n\r\n.ssche__modal_actions {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: flex-end;\r\n  margin-top: 16px;\r\n}\r\n\r\n.ssche__modal_btn_cancel {\r\n  margin-right: 16px;\r\n  border: none;\r\n  background-color: transparent;\r\n  color: #0288d1;\r\n  border-radius: 2px;\r\n}\r\n\r\n.ssche__modal_btn_save {\r\n  border: none;\r\n  background-color: #0288d1;\r\n  color: white;\r\n  border-radius: 2px;\r\n}\r\n\r\n.ssche__modal_btn_delete {\r\n  border: none;\r\n  color: #ff584c;\r\n  border-radius: 2px;\r\n  background-color: white;\r\n}\r\n\r\n.ssche__modal_btn_cancel:hover {\r\n  background-color: #d9edf8; \r\n}\r\n\r\n.ssche__modal_btn_save:hover {\r\n  background-color: #0299EB;\r\n}\r\n\r\n.ssche__modal_btn_save:disabled {\r\n  background-color: #0079bb;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.ssche__modal_btn_delete:hover {\r\n  background-color: #ff584c4d;\r\n}\r\n\r\n/* -------------------------------------------------------------------------------- */\r\n\r\n.ssche__event {\r\n  display: flex;\r\n  align-items: center;\r\n  padding: 0 16px;\r\n  height: 24px;\r\n  min-height: 24px;\r\n  background-color: #0288d1;\r\n  color: white;\r\n  border-radius: 5px;\r\n  font-size: 14px;\r\n  cursor: pointer;\r\n  box-sizing: border-box;\r\n  margin-bottom: 2px;\r\n  position: absolute;\r\n}\r\n.ssche__event span {\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  user-select: none;\r\n}\r\n\r\n/* ------------------------------------------------------------ */\r\n\r\n.ssche__checkbox-form-group {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: flex-start;\r\n  margin-bottom: 8px;\r\n  margin-left: 16px;\r\n}',""]);const a=o},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,s,i){"string"==typeof e&&(e=[[null,e,void 0]]);var o={};if(r)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(o[l]=!0)}for(var d=0;d<e.length;d++){var c=[].concat(e[d]);r&&o[c[0]]||(void 0!==i&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=i),n&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=n):c[2]=n),s&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=s):c[4]="".concat(s)),t.push(c))}},t}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var i={},o=[],a=0;a<e.length;a++){var l=e[a],d=r.base?l[0]+r.base:l[0],c=i[d]||0,h="".concat(d," ").concat(c);i[d]=c+1;var u=n(h),m={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==u)t[u].references++,t[u].updater(m);else{var b=s(m,r);r.byIndex=a,t.splice(a,0,{identifier:h,updater:b,references:1})}o.push(h)}return o}function s(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,s){var i=r(e=e||[],s=s||{});return function(e){e=e||[];for(var o=0;o<i.length;o++){var a=n(i[o]);t[a].references--}for(var l=r(e,s),d=0;d<i.length;d++){var c=n(i[d]);0===t[c].references&&(t[c].updater(),t.splice(c,1))}i=l}}},569:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,s&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var i=n.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(r){var s=t[r];if(void 0!==s)return s.exports;var i=t[r]={id:r,exports:{}};return e[r](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};(()=>{n.d(r,{default:()=>p});var e=n(379),t=n.n(e),s=n(795),i=n.n(s),o=n(569),a=n.n(o),l=n(565),d=n.n(l),c=n(216),h=n.n(c),u=n(589),m=n.n(u),b=n(792),g={};g.styleTagTransform=m(),g.setAttributes=d(),g.insert=a().bind(null,"head"),g.domAPI=i(),g.insertStyleElement=h(),t()(b.Z,g),b.Z&&b.Z.locals&&b.Z.locals;const p=class{constructor(e){Object.defineProperty(this,"filters",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"filtersSelected",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"sectionsConfigs",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"isFiltering",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"onlyRead",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"cellWidth",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"createCallback",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"deleteCallback",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"editCallback",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"eventDraggedCallback",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"sections",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"drawnSections",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"totalDays",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"title",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"lang",{enumerable:!0,configurable:!0,writable:!0,value:"en"}),Object.defineProperty(this,"currentMonth",{enumerable:!0,configurable:!0,writable:!0,value:(new Date).getMonth()}),Object.defineProperty(this,"currentYear",{enumerable:!0,configurable:!0,writable:!0,value:(new Date).getFullYear()}),Object.defineProperty(this,"rootId",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"events",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"drawnEvents",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"eventDragging",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"langs",{enumerable:!0,configurable:!0,writable:!0,value:{en:{months:["January","February","March","April","May","June","July","August","September","October","November","December"],actions:{create:"Create",save:"Save",cancel:"Cancel",present:"Present",delete:"Delete",filter:"Filter",removeFilter:"Delete filter"},labels:{description:"Description",section:"Section",period:"Time period"}},es:{months:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],actions:{create:"Crear",save:"Guardar",cancel:"Cancelar",present:"Presente",delete:"Borrar",filter:"Filtrar",removeFilter:"Borrar filtros"},labels:{description:"Descripción",section:"Sección",period:"Periodo de tiempo"}}}}),Object.defineProperty(this,"getTextLang",{enumerable:!0,configurable:!0,writable:!0,value:e=>this.lang in this.langs?this.langs[this.lang][e]:(console.warn(`Lang: ${this.lang} is not available. Fallback lang: 'en'`),this.langs.en[e])}),Object.defineProperty(this,"closeModalEvent",{enumerable:!0,configurable:!0,writable:!0,value:e=>{"Escape"===e.key&&this.closeModal()}}),Object.defineProperty(this,"appendSelectOptions",{enumerable:!0,configurable:!0,writable:!0,value:(e,t)=>{const n=document.createElement("option");n.innerText="-",n.value="",t.appendChild(n),e.forEach((e=>{const n=document.createElement("option");n.innerText=e.label,n.value=e.id,t.appendChild(n)}))}}),Object.defineProperty(this,"createEditModal",{enumerable:!0,configurable:!0,writable:!0,value:e=>{document.getElementById(`${this.rootId}-btn-create`).disabled=!0,this.filters&&(document.getElementById(`${this.rootId}-filters`).disabled=!0);const t=document.getElementsByTagName("body")[0],n=document.createElement("div");n.id=`${this.rootId}-modal`,n.classList.add("ssche__overlay"),n.innerHTML=`\n      <div class="ssche__modal_body">\n        <h2 class="ssche__modal_title">\n          ${this.getTextLang("actions").create}\n        </h2>\n        <div class="ssche__modal_content">\n          <div class="ssche__modal_form_row">\n            <label for="${this.rootId}-description" class="ssche__modal_input_label">\n              ${this.getTextLang("labels").description}\n            </label>\n            <textarea \n              rows="6"\n              id="${this.rootId}-description" \n              class="ssche__modal_input"\n              ></textarea>\n          </div>\n          <div class="ssche__modal_form_row">\n            <label for="${this.rootId}-section" class="ssche__modal_input_label">\n              ${this.getTextLang("labels").section}\n            </label>\n            <select \n              id="${this.rootId}-section" \n              class="ssche__modal_input"\n            ></select>\n          </div>\n          <div class="ssche__modal_form_row">\n            <label class="ssche__modal_input_label">\n              ${this.getTextLang("labels").period}\n            </label>\n            <div class="ssche__modal_multi_row">\n              <div class="ssche__modal_range_row">\n                <input id="${this.rootId}-start-time" type="time" class="ssche__range-input" />\n                <input id="${this.rootId}-start-date" type="date" class="ssche" />\n              </div>\n              <div class="ssche__modal_range_row">\n                <input id="${this.rootId}-end-time" type="time" class="ssche__range-input"/>\n                <input id="${this.rootId}-end-date" type="date" class="ssche" />\n              </div>\n            </div>\n          </div>\n          <div class="ssche__modal_actions">\n          ${e&&!this.onlyRead?`\n            <button class="ssche__btn ssche__modal_btn_delete" id="${this.rootId}-modal-delete">\n              ${this.getTextLang("actions").delete}\n            </button>`:""}\n            <button class="ssche__btn ssche__modal_btn_cancel" id="${this.rootId}-modal-cancel">\n              ${this.getTextLang("actions").cancel}\n            </button>\n            ${this.onlyRead?"":`\n            <button class="ssche__btn ssche__modal_btn_save" id="${this.rootId}-modal-save">\n              ${this.getTextLang("actions").save}\n            </button>`}\n          </div>\n        </div>\n      </div>\n    `,t.appendChild(n),this.appendSelectOptions(this.drawnSections,document.getElementById(`${this.rootId}-section`)),n.addEventListener("click",(e=>{e.target.id===`${this.rootId}-modal`&&this.closeModal()}));const r=document.getElementById(`${this.rootId}-modal-cancel`);r.addEventListener("click",this.closeModal),this.onlyRead&&(r.style.marginRight="0px"),document.addEventListener("keydown",this.closeModalEvent);const s=document.getElementById(`${this.rootId}-description`),i=document.getElementById(`${this.rootId}-section`),o=document.getElementById(`${this.rootId}-start-date`),a=document.getElementById(`${this.rootId}-end-date`),l=document.getElementById(`${this.rootId}-start-time`),d=document.getElementById(`${this.rootId}-end-time`),c=document.getElementById(`${this.rootId}-modal-save`);if(this.onlyRead)s.disabled=!0,i.disabled=!0,l.disabled=!0,o.disabled=!0,d.disabled=!0,a.disabled=!0;else{const t=()=>{c.disabled=""===o.value||""===a.value||""===i.value||""===s.value};o.addEventListener("change",(e=>{a.min=e.target.value,t()})),a.addEventListener("change",(e=>{o.max=e.target.value,t()})),i.addEventListener("change",t),s.addEventListener("input",t),l.addEventListener("change",(e=>{const t=e.target.value;d.min=t;const n=new Date(0,0,0,+t.split(":")[0],+t.split(":")[1]);new Date(0,0,0,+d.value.split(":")[0],+d.value.split(":")[1]).getTime()<n.getTime()&&(d.value="")})),t(),c.addEventListener("click",(()=>{const t={description:s.value,section:i.value,startTime:l.value,startDate:o.value,endTime:d.value,endDate:a.value};if(e){if(t.id=e.id,!this.editCallback)throw new Error("Callback 'onEventEdited' isn't defined.");this.editCallback(e,t)}else{if(!this.createCallback)throw new Error("Callback 'onEventCreated' isn't defined.");this.createCallback(t)}this.closeModal()}))}e&&(s.value=e.description,i.value=e.section,o.value=e.startDate,a.value=e.endDate,o.max=e.endDate,a.min=e.startDate,l.value=e.startTime,d.value=e.endTime,l.max=e.endTime,d.min=e.startTime,!this.onlyRead)&&(document.getElementById(`${this.rootId}-modal-delete`).addEventListener("click",(()=>{if(!this.deleteCallback)throw new Error("Callback 'onEventDeleted' isn't defined.");this.deleteCallback(e),this.closeModal()})),c.disabled=!1)}}),Object.defineProperty(this,"closeModal",{enumerable:!0,configurable:!0,writable:!0,value:()=>{const e=document.getElementsByTagName("body")[0],t=document.getElementById(`${this.rootId}-modal`);t&&e.removeChild(t),document.getElementById(`${this.rootId}-btn-create`).disabled=!1,this.filters&&(document.getElementById(`${this.rootId}-filters`).disabled=!1),document.removeEventListener("keydown",this.closeModalEvent)}}),Object.defineProperty(this,"isDrawableNow",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=new Date(this.currentYear,this.currentMonth,1).getTime(),n=new Date(this.currentYear,this.currentMonth+1,0).getTime(),r=e.start<t&&e.end>t,s=e.start>=t&&e.end<=n,i=e.start<=n&&e.end>n,o=r||s||i;return this.drawnSections.length!==this.sections.length?o&&this.drawnSections.map((e=>e.id)).includes(e.eventFormData.section):o}}),Object.defineProperty(this,"updateScheduler",{enumerable:!0,configurable:!0,writable:!0,value:(e=!1)=>{this.title&&(this.title.innerText=`${this.getTextLang("months")[this.currentMonth]} ${this.currentYear}`);const t=document.getElementById(`${this.rootId}-grid`);if(!this.rootId)throw new Error("Root HTML Element doesn't exist.");{const n=document.getElementById(this.rootId);if(n&&t){t&&n.removeChild(t);const r=new Date(this.currentYear,this.currentMonth+1,0);this.totalDays=r.getDate();const s=document.createElement("div");s.innerHTML='\n          <div class="ssche__grid-head"></div>\n          <div class="ssche__grid-head day-labels"></div>\n        ',s.classList.add("ssche__grid"),s.id=`${this.rootId}-grid`,n.append(s),this.createGrid(),this.drawnEvents={},e&&(this.events=this.events.map((e=>this.computeEvent(e.eventFormData)))),this.events.filter((e=>this.isDrawableNow(e))).forEach((e=>{this.drawnEvents[e.id]=e,this.drawEvent(e)}))}}}}),Object.defineProperty(this,"createHeading",{enumerable:!0,configurable:!0,writable:!0,value:()=>{const e=document.getElementById(`${this.rootId}-heading`);if(!e)throw new Error("Root HTML Element doesn't exist.");e.innerHTML=`\n        <div style="display: flex; align-items: center; height: 100%">\n          ${this.onlyRead?"":`\n            <button id="${this.rootId}-btn-create" class="ssche__btn ssche__heading_button">\n              ${this.langs[this.lang].actions.create}\n            </button>\n          `}\n          ${this.filters?`\n          <button \n            id="${this.rootId}-filters" \n            style="${this.onlyRead?"":"margin-left: 16px"}" \n            class="ssche__btn ssche__heading_button"\n          >\n            ${this.langs[this.lang].actions.filter}\n          </button>`:""}\n        </div>\n        <h1 id="${this.rootId}-title">${this.getTextLang("months")[this.currentMonth]} ${this.currentYear}</h1>\n        <div class="ssche__heading_controls">\n          <div id="${this.rootId}-left-control" class="ssche__control ssche__control_side">\n            &#129136;\n          </div>\n          <div id="${this.rootId}-present-control" class="ssche__control">\n            ${this.getTextLang("actions").present}\n          </div>\n          <div id="${this.rootId}-right-control" class="ssche__control ssche__control_side">\n            &#129138;\n          </div>\n        </div>\n      `,this.onlyRead||document.getElementById(`${this.rootId}-btn-create`).addEventListener("click",(()=>this.createEditModal())),this.filters&&document.getElementById(`${this.rootId}-filters`).addEventListener("click",(()=>this.filtersModal())),this.title=document.getElementById(`${this.rootId}-title`),document.getElementById(`${this.rootId}-left-control`).addEventListener("click",(()=>{this.currentMonth-=1,this.currentMonth<0&&(this.currentMonth=11,this.currentYear-=1),this.updateScheduler()})),document.getElementById(`${this.rootId}-right-control`).addEventListener("click",(()=>{this.currentMonth+=1,this.currentMonth>11&&(this.currentMonth=0,this.currentYear+=1),this.updateScheduler()})),document.getElementById(`${this.rootId}-present-control`).addEventListener("click",(()=>{const e=new Date;this.currentMonth=e.getMonth(),this.currentYear=e.getFullYear(),this.updateScheduler()}))}}),Object.defineProperty(this,"createGrid",{enumerable:!0,configurable:!0,writable:!0,value:()=>{const e=document.getElementById(`${this.rootId}-grid`);if(!e)throw new Error("Root HTML Element doesn't exist.");{this.drawnSections.forEach(((t,n)=>{const r=document.createElement("div");r.classList.add("section-label"),r.innerText=t.label;const s=document.createElement("div");s.classList.add("events-container"),s.style.position="relative",e.appendChild(r),e.appendChild(s),this.sectionsConfigs.forEach((e=>{e.optionsToApply.includes(t[e.propToVerify])&&(r.style.backgroundColor=e.colorState.background,e.colorState.text&&(r.style.color=e.colorState.text),e.colorState.border&&(r.style.borderColor=e.colorState.border))}))}));const t=e.getElementsByClassName("day-labels")[0];t.style.gridTemplateColumns=`repeat(${this.totalDays}, minmax(40px, 1fr))`;for(let e=0;e<this.totalDays;e++){const n=document.createElement("div");n.innerText=`${e+1}`,t.appendChild(n)}Array.from(e.getElementsByClassName("events-container")).forEach(((e,t)=>{const n=document.createElement("div"),r=document.createElement("div");n.classList.add("ssche__cells"),n.style.gridTemplateColumns=`repeat(${this.totalDays}, minmax(40px, 1fr))`,r.classList.add("ssche__drag-zone");for(let e=0;e<this.totalDays;e++){const e=document.createElement("div");n.appendChild(e),this.sectionsConfigs.forEach((n=>{n.optionsToApply.includes(this.drawnSections[t][n.propToVerify])&&(e.style.backgroundColor=n.colorState.background,n.colorState.border&&(e.style.borderColor=n.colorState.border))}))}e.appendChild(r),e.appendChild(n)}));const n=document.getElementsByClassName("ssche__cells")[0].childNodes[0];this.cellWidth=n.getClientRects()[0].width,window.addEventListener("resize",(()=>{const t=document.getElementsByClassName("ssche__cells")[0].childNodes[0];this.cellWidth=t.getClientRects()[0].width,Array.from(e.getElementsByClassName("ssche__event")).forEach((e=>{this.calcLeftSize(this.drawnEvents[e.dataset.id]);const{left:t,size:n}=this.calcLeftSize(this.drawnEvents[e.dataset.id]);e.style.left=`${t}px`,e.style.width=`${n}px`}))}))}}}),Object.defineProperty(this,"computeEvent",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=this.drawnSections.map((e=>e.id)).indexOf(e.section),n=e.startDate.split("-"),r=e.endDate.split("-"),s=new Date(+n[0],+n[1]-1,+n[2]),i=new Date(+r[0],+r[1]-1,+r[2]+1);return{id:e.id||"",eventFormData:e,section:t,startDay:s.getDate(),endDay:i.getDate(),start:s.getTime(),end:i.getTime()}}}),Object.defineProperty(this,"calcTop",{enumerable:!0,configurable:!0,writable:!0,value:(e,t)=>{const n=document.getElementById(`${this.rootId}-grid`);if(n){if(0===t.length)return 2;const r=t.reduce(((t,n)=>{if(n.id===e.id)return t;const r=n.start<e.start&&n.end>e.start,s=n.start>=e.start&&n.end<=e.end,i=n.start<e.start&&n.end>e.end,o=n.start<e.end&&n.end>e.end;return r||o||s||i?[...t,n]:t}),[]).reduce(((e,t)=>{const r=n.querySelector(`div.ssche__event[data-id="${t.id}"]`);if(null===r)return e;const s=r.style.top,i=+s.substring(0,s.length-2);return[...e,i-2]}),[]).sort(((e,t)=>e-t));if(0===r.length)return 2;if(0!==r[0])return 2;for(let e=1;e<r.length;e++)if(r[e]>r[e-1]+26)return r[e-1]+28;return r[r.length-1]+28}throw new Error("Root HTML Element doesn't exist.")}}),Object.defineProperty(this,"calcLeftSize",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=new Date(this.currentYear,this.currentMonth,1).getTime(),n=new Date(this.currentYear,this.currentMonth+1,0).getTime(),r=e.start<t?0:e.startDay-1,s=(e.end>n?this.totalDays:e.endDay-1)-r,i=this.cellWidth*s-1;return{left:r*this.cellWidth+1,size:i>0?i:this.cellWidth}}}),Object.defineProperty(this,"drawEvent",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=document.getElementById(`${this.rootId}-grid`);if(!t)throw new Error("Root HTML Element doesn't exist.");{const n=document.createElement("div");n.innerHTML=`<span>${e.eventFormData.description}</span>`,n.classList.add("ssche__event"),n.dataset.id=`${e.eventFormData.id}`,n.addEventListener("dblclick",(()=>this.createEditModal(e.eventFormData)));const{left:r,size:s}=this.calcLeftSize(e);n.style.left=`${r}px`,n.style.width=`${s}px`,t.getElementsByClassName("ssche__drag-zone")[e.section].appendChild(n),this.updateVertical(e.section),this.onlyRead||this.addDragging(n)}}}),Object.defineProperty(this,"updateVertical",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=document.getElementById(`${this.rootId}-grid`);if(!t)throw new Error("Root HTML Element doesn't exist.");{const n=t.getElementsByClassName("ssche__drag-zone")[e],r=Array.from(null==n?void 0:n.getElementsByClassName("ssche__event"));r.sort(((e,t)=>{const n=this.drawnEvents[e.dataset.id],r=this.drawnEvents[t.dataset.id];return r.end-r.start-(n.end-n.start)}));const s=[];let i=0;r.forEach((e=>{let t=0;t=this.calcTop(this.drawnEvents[e.dataset.id],s),e.style.top=`${t}px`,s.push(this.drawnEvents[e.dataset.id]),i<t&&(i=t)})),(null==n?void 0:n.parentNode).style.minHeight=`${i+26}px`}}}),Object.defineProperty(this,"addDragging",{enumerable:!0,configurable:!0,writable:!0,value:e=>{let t=!1,n=!1,r=0,s=0;const i=document.getElementById(`${this.rootId}-grid`),o=Array.from(null==i?void 0:i.getElementsByClassName("ssche__drag-zone")),a=Object.assign({},this.drawnEvents[e.dataset.id].eventFormData),l=()=>{var e;(t||n)&&this.eventDraggedCallback&&this.eventDraggedCallback(a,this.drawnEvents[null===(e=this.eventDragging)||void 0===e?void 0:e.dataset.id].eventFormData),this.eventDragging=null,o.forEach((e=>{e.onmousemove=null})),document.removeEventListener("mouseup",l)},d=(i,o)=>{i.onmousemove=i=>{var a;const l=this.drawnEvents[e.dataset.id],d=i||window.event,c=i.target;if(i.preventDefault(),s=r-d.clientX,Math.abs(s)>this.cellWidth){r=d.clientX;const e=Math.round(s/this.cellWidth),n=new Date(l.start),i=new Date(l.end);n.setDate(n.getDate()-e),i.setDate(i.getDate()-e),l.start=n.getTime(),l.startDay=n.getDate(),l.end=i.getTime(),l.endDay=i.getDate();const o=n.toISOString();i.setDate(i.getDate()-1);const a=i.toISOString();l.eventFormData.startDate=o.substring(0,o.indexOf("T")),l.eventFormData.endDate=a.substring(0,a.indexOf("T")),t=!0}const h=c.classList.contains("ssche__drag-zone"),u=null===(a=this.eventDragging)||void 0===a?void 0:a.parentNode;if(h&&c!==u&&(u.removeChild(this.eventDragging),c.appendChild(this.eventDragging),this.updateVertical(l.section),l.section=o,l.eventFormData.section=this.drawnSections[o].id,n=!0),t||n){const{left:r,size:s}=this.calcLeftSize(l);e.style.left=`${r}px`,e.style.width=`${s}px`,this.updateVertical(l.section),t=!1,n=!1}},document.addEventListener("mouseup",l)};e.onmousedown=t=>{(t=t||window.event).preventDefault(),r=t.clientX,this.eventDragging=e,o.forEach(((e,t)=>{d(e,t)}))}}}),Object.defineProperty(this,"filtersModal",{enumerable:!0,configurable:!0,writable:!0,value:()=>{if(this.filters){document.getElementById(`${this.rootId}-btn-create`).disabled=!0;const e=document.getElementById(`${this.rootId}-filters`);e.disabled=!0;const t=document.getElementsByTagName("body")[0],n=document.createElement("div");n.id=`${this.rootId}-modal`,n.classList.add("ssche__overlay"),n.innerHTML=`\n        <div class="ssche__modal_body">\n          <h2 class="ssche__modal_title">\n            ${this.getTextLang("actions").filter}\n          </h2>\n          <div class="ssche__modal_content">\n            ${Object.keys(this.filters).reduce(((e,t)=>e+this.filterField(t)),"")}\n            <div class="ssche__modal_actions">\n              <button class="ssche__btn ssche__modal_btn_delete" id="${this.rootId}-modal-remove">\n                ${this.getTextLang("actions").removeFilter}\n              </button>\n              <button class="ssche__btn ssche__modal_btn_cancel" id="${this.rootId}-modal-cancel">\n                ${this.getTextLang("actions").cancel}\n              </button>\n              <button class="ssche__btn ssche__modal_btn_save" id="${this.rootId}-modal-filter">\n                ${this.getTextLang("actions").filter}\n              </button>\n            </div>\n          </div>\n        </div>\n      `,t.appendChild(n),document.getElementById(`${this.rootId}-modal-cancel`).addEventListener("click",this.closeModal),n.addEventListener("click",(e=>{e.target.id===`${this.rootId}-modal`&&this.closeModal()})),document.addEventListener("keydown",this.closeModalEvent);const r=document.getElementById(`${this.rootId}-modal-filter`);r.addEventListener("click",(()=>{this.filters&&(this.filtersSelected={},Object.keys(this.filters).forEach((e=>{const t=n.querySelectorAll(`.${e}-filter:checked`);t.length>0&&(this.filtersSelected[e]=Array.from(t).map((e=>e.value)))})),this.closeModal(),Object.keys(this.filtersSelected).length>0&&e.classList.add("ssche__button-active"),this.drawnSections=this.sections.filter((e=>{let t=!0;return Object.keys(this.filtersSelected).forEach((n=>{t=t&&this.filtersSelected[n].includes(e[n])})),t})),this.updateScheduler(!0))}));const s=Array.from(n.querySelectorAll('input[type="checkbox"]')),i=()=>{const e=s.reduce(((e,t)=>e&&!t.checked),!0);r.disabled=e};s.forEach((e=>{e.addEventListener("change",(()=>i()))})),i(),document.getElementById(`${this.rootId}-modal-remove`).addEventListener("click",(()=>{this.filtersSelected={},Array.from(n.querySelectorAll('input[type="checkbox"]')).forEach((e=>{e.checked=!1})),e.classList.remove("ssche__button-active"),this.closeModal(),this.drawnSections=[...this.sections],this.updateScheduler(!0)}));const o=Object.keys(this.filtersSelected);o.length>0&&o.forEach((e=>{this.filtersSelected[e].forEach((t=>{n.querySelector(`.${e}-filter[value="${t}"]`).checked=!0}))}))}}}),Object.defineProperty(this,"filterField",{enumerable:!0,configurable:!0,writable:!0,value:e=>this.filters?`\n        <div class="ssche__modal_form_row">\n          <p style="margin: 0; line-height: 1;" class="ssche__modal_input_label">\n            ${e}:\n          </p>\n          <div class="ssche__modal_multi_row">\n            ${this.filters[e].reduce(((t,n,r)=>t+`              \n              <div class="ssche__checkbox-form-group">\n                <input \n                  id="${this.rootId}-${e}-${r}"\n                  type="checkbox"\n                  class="${e}-filter"\n                  value="${n}"\n                />\n                <label \n                  style="display: flex; align-items: center;"\n                  for="${this.rootId}-${e}-${r}"\n                >\n                  ${n}\n                </label>\n              </div>\n            `),"")}\n          </div>\n        </div>\n      `:""}),Object.defineProperty(this,"sectionUISettings",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=document.getElementById(`${this.rootId}-grid`);if(!t)throw new Error("");{const n=this.sections[e],r=t.getElementsByClassName("section-label")[e],s=t.getElementsByClassName("events-container")[e];this.sectionsConfigs.forEach((e=>{e.optionsToApply.includes(n[e.propToVerify])&&(r.style.backgroundColor=e.colorState.background,e.colorState.text&&(r.style.color=e.colorState.text),e.colorState.border&&(r.style.borderColor=e.colorState.border),Array.from(s.childNodes[1].childNodes).forEach((t=>{t.style.backgroundColor=e.colorState.background,e.colorState.border&&(t.style.borderColor=e.colorState.border)})))}))}}}),Object.defineProperty(this,"onEventCreated",{enumerable:!0,configurable:!0,writable:!0,value:e=>{this.createCallback=e}}),Object.defineProperty(this,"onEventDeleted",{enumerable:!0,configurable:!0,writable:!0,value:e=>{this.deleteCallback=e}}),Object.defineProperty(this,"onEventEdited",{enumerable:!0,configurable:!0,writable:!0,value:e=>{this.editCallback=e}}),Object.defineProperty(this,"onEventUpdatedByDrag",{enumerable:!0,configurable:!0,writable:!0,value:e=>{this.eventDraggedCallback=e}}),Object.defineProperty(this,"addEvent",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=this.computeEvent(e);this.events.push(t),this.isDrawableNow(t)&&(this.drawnEvents[t.id]=t,this.drawEvent(t))}}),Object.defineProperty(this,"removeEvent",{enumerable:!0,configurable:!0,writable:!0,value:e=>{if(null===e)throw new Error(`Id not valid: ${e}`);{const t=document.getElementById(`${this.rootId}-grid`),n=null==t?void 0:t.querySelector(`div.ssche__event[data-id="${e}"]`);if(null===n)throw new Error(`No events with id: ${e}`);{const t=n.parentElement,r=this.drawnEvents[e].section;this.events=this.events.filter((t=>t.id!==e)),delete this.drawnEvents[e],t.removeChild(n),this.updateVertical(r)}}}}),Object.defineProperty(this,"updateSectionData",{enumerable:!0,configurable:!0,writable:!0,value:(e,t)=>{const n=this.sections.find((t=>t.id===e));Object.keys(n).forEach((e=>{"id"!==e&&(n[e]=t[e])})),this.sectionUISettings(this.drawnSections.map((e=>e.id)).indexOf(n.id))}}),console.log(e),this.rootId=e.root,"onlyRead"in e&&(this.onlyRead=e.onlyRead);const t=document.getElementById(this.rootId);if(this.sections=[...e.sections],this.drawnSections=e.sections,this.sectionsConfigs=e.sectionConfigs||[],"filters"in e&&(this.filters=e.filters||null),e.lang&&(this.lang=e.lang),!t)throw new Error("Root HTML Element doesn't exist.");t.classList.add("ssche__container");const n=new Date(this.currentYear,this.currentMonth+1,0);this.totalDays=n.getDate(),t.innerHTML=`\n      <div id="${this.rootId}-heading" class="ssche__heading"></div>\n      <div id="${this.rootId}-grid" class="ssche__grid">\n        <div class="ssche__grid-head"></div>\n        <div class="ssche__grid-head day-labels"></div>\n      </div>\n    `,this.createHeading(),this.createGrid()}}})(),Scheduler=r.default})();