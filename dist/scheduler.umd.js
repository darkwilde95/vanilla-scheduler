!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Scheduler=t():e.Scheduler=t()}(self,(function(){return(()=>{"use strict";var e={792:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(81),o=n.n(r),i=n(645),s=n.n(i)()(o());s.push([e.id,'[class^="ssche__"], \r\n[class^="ssche__"] * {\r\n  outline: none;\r\n  box-sizing: content-box;\r\n}\r\n\r\n[class^="ssche__"]::-webkit-scrollbar, \r\n[class^="ssche__"] ::-webkit-scrollbar {\r\n  width: 6px;\r\n  height: 6px;\r\n}\r\n\r\n[class^="ssche__"]::-webkit-scrollbar-thumb,\r\n[class^="ssche__"] ::-webkit-scrollbar-thumb {\r\n  border-radius: 8px;\r\n  background-color: rgba(0,0,0,0.5);\r\n}\r\n\r\n.ssche__container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  overflow: hidden;\r\n  min-width: 100%;\r\n  max-width: 100vw;\r\n  position: relative;\r\n  height: 100%;\r\n  max-height: 100vh;\r\n}\r\n\r\n.ssche__heading, .ssche__heading_controls {\r\n  display: flex;\r\n  flex-direction: row;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  font-family: system-ui;\r\n}\r\n\r\n.ssche__heading {\r\n  position: sticky;\r\n  top: 0;\r\n  padding: 8px;\r\n  z-index: 2;\r\n}\r\n\r\n.ssche__heading h1 {\r\n  margin: 0;\r\n}\r\n\r\n.ssche__btn {\r\n  font-family: system-ui;\r\n  padding: 4px 16px;\r\n  text-transform: uppercase;\r\n  font-size: 16px;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  user-select: none;\r\n}\r\n\r\n.ssche__heading_button {\r\n  background-color: white;\r\n  border: 1px solid #0288d1;\r\n  color: #0288d1;\r\n}\r\n\r\n.ssche__heading_button:hover {\r\n  background-color: #edf8ff;\r\n}\r\n\r\n.ssche__heading_button:active {\r\n  color: white;\r\n  background-color: #0288d1;\r\n}\r\n\r\n.ssche__heading_controls {\r\n  color: #0288d1;\r\n}\r\n\r\n.ssche__control {\r\n  min-width: 32px;\r\n  min-height: 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  margin: 0 8px;\r\n  cursor: pointer;\r\n  padding: 4px 12px;\r\n  user-select: none;\r\n  font-weight: bold;\r\n  border-radius: 2px;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.ssche__control:hover {\r\n  background-color: rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.ssche__control_side {\r\n  border-radius: 50%;\r\n  padding: 0;\r\n  font-size: 18px;\r\n}\r\n\r\n.ssche__grid {\r\n  display: grid;\r\n  grid-template-rows: 32px;\r\n  grid-auto-rows: auto;\r\n  overflow: auto;\r\n}\r\n\r\n.ssche__grid_heading_cell {\r\n  display: flex;\r\n  position: sticky;\r\n  top: 0;\r\n  justify-content: center;\r\n  align-items: flex-end;\r\n  padding-bottom: 12px;\r\n  font-weight: 600;\r\n  color: rgba(0, 0, 0, 0.55);\r\n  font-family: system-ui;\r\n  background-color: white;\r\n  box-shadow: 4px 4px 4px 0 #00000032;\r\n  z-index: 2;\r\n}\r\n\r\n.ssche__grid_heading_row {\r\n  display: contents;\r\n  \r\n}\r\n\r\n.ssche__cell {\r\n  display: flex;\r\n  background-color: white;\r\n  border: 1px solid #ebeced;\r\n  color: rgba(0, 0, 0, 0.55);\r\n  font-weight: 600;\r\n  font-family: system-ui;\r\n  overflow-x: visible;\r\n  flex-direction: column;\r\n  justify-content: flex-start;\r\n  position: relative;\r\n}\r\n\r\n.ssche__cell_label {\r\n  align-items: center;\r\n  justify-content: center;\r\n  min-height: 80px;\r\n}\r\n\r\n.ssche__overlay {\r\n  display: flex;\r\n  background-color: #000000bf;\r\n  position: absolute;\r\n  top: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  left: 0;\r\n  justify-content: center;\r\n  align-items: center;\r\n  z-index: 3;\r\n}\r\n\r\n.ssche__modal_body {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 500px;\r\n  background-color: white;\r\n  border-radius: 2px;\r\n  box-shadow: 4px 4px 4px 0 #0000001a;\r\n  z-index: 4;\r\n}\r\n\r\n.ssche__modal_title {\r\n  margin: 0;\r\n  padding: 4px 12px;\r\n  font-family: system-ui;\r\n  background-color: #0288d1;\r\n  color: white;\r\n  font-weight: normal;\r\n}\r\n\r\n.ssche__modal_content {\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 16px;\r\n}\r\n\r\n.ssche__modal_form_row {\r\n  display: flex;\r\n  flex-direction: row;\r\n  align-items: flex-start;\r\n  margin-top: 24px;\r\n  font-family: system-ui;\r\n}\r\n\r\n.ssche__modal_input_label {\r\n  min-width: 100px;\r\n  text-align: right;\r\n  margin-right: 24px;\r\n  font-weight: 600;\r\n  color: rgba(0, 0, 0, 0.75);\r\n}\r\n\r\n.ssche__modal_input {\r\n  width: 100%;\r\n  padding: 8px;\r\n  font-family: system-ui;\r\n}\r\n\r\n.ssche__modal_double_row {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n}\r\n\r\n.ssche__modal_range_row {\r\n  display: flex;\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.ssche__modal_range_row .ssche__range-input {\r\n  margin-right: 16px;\r\n}\r\n\r\n.ssche__modal_actions {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: flex-end;\r\n  margin-top: 16px;\r\n}\r\n\r\n.ssche__modal_btn_cancel {\r\n  margin-right: 16px;\r\n  border: none;\r\n  background-color: transparent;\r\n  color: #0288d1;\r\n  border-radius: 2px;\r\n}\r\n\r\n.ssche__modal_btn_save {\r\n  border: none;\r\n  background-color: #0288d1;\r\n  color: white;\r\n  border-radius: 2px;\r\n}\r\n\r\n.ssche__modal_btn_delete {\r\n  border: none;\r\n  color: #ff584c;\r\n  border-radius: 2px;\r\n  background-color: white;\r\n}\r\n\r\n.ssche__modal_btn_cancel:hover {\r\n  background-color: #d9edf8; \r\n}\r\n\r\n.ssche__modal_btn_save:hover {\r\n  background-color: #0299EB;\r\n}\r\n\r\n.ssche__modal_btn_save:disabled {\r\n  background-color: #0079bb;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.ssche__modal_btn_delete:hover {\r\n  background-color: #ff584c4d;\r\n}\r\n\r\n.ssche__event {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  height: 24px;\r\n  min-height: 24px;\r\n  background-color: #0288d1;\r\n  color: white;\r\n  border-radius: 5px;\r\n  z-index: 1;\r\n  font-size: 14px;\r\n  cursor: pointer;\r\n  box-sizing: border-box;\r\n  margin-bottom: 2px;\r\n  position: absolute;\r\n}',""]);const a=s},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,o,i){"string"==typeof e&&(e=[[null,e,void 0]]);var s={};if(r)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(s[l]=!0)}for(var d=0;d<e.length;d++){var c=[].concat(e[d]);r&&s[c[0]]||(void 0!==i&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=i),n&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=n):c[2]=n),o&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=o):c[4]="".concat(o)),t.push(c))}},t}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var i={},s=[],a=0;a<e.length;a++){var l=e[a],d=r.base?l[0]+r.base:l[0],c=i[d]||0,h="".concat(d," ").concat(c);i[d]=c+1;var u=n(h),b={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==u)t[u].references++,t[u].updater(b);else{var m=o(b,r);r.byIndex=a,t.splice(a,0,{identifier:h,updater:m,references:1})}s.push(h)}return s}function o(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,o){var i=r(e=e||[],o=o||{});return function(e){e=e||[];for(var s=0;s<i.length;s++){var a=n(i[s]);t[a].references--}for(var l=r(e,o),d=0;d<i.length;d++){var c=n(i[d]);0===t[c].references&&(t[c].updater(),t.splice(c,1))}i=l}}},569:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var i=n.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={id:r,exports:{}};return e[r](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};return(()=>{n.d(r,{default:()=>g});var e=n(379),t=n.n(e),o=n(795),i=n.n(o),s=n(569),a=n.n(s),l=n(565),d=n.n(l),c=n(216),h=n.n(c),u=n(589),b=n.n(u),m=n(792),p={};p.styleTagTransform=b(),p.setAttributes=d(),p.insert=a().bind(null,"head"),p.domAPI=i(),p.insertStyleElement=h(),t()(m.Z,p),m.Z&&m.Z.locals&&m.Z.locals;const g=class{constructor(e){Object.defineProperty(this,"onlyRead",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"cellWidth",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"createCallback",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"deleteCallback",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"editCallback",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"rows",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"totalCols",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"totalCells",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"title",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"lang",{enumerable:!0,configurable:!0,writable:!0,value:"en"}),Object.defineProperty(this,"currentMonth",{enumerable:!0,configurable:!0,writable:!0,value:(new Date).getMonth()}),Object.defineProperty(this,"currentYear",{enumerable:!0,configurable:!0,writable:!0,value:(new Date).getFullYear()}),Object.defineProperty(this,"rootId",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"events",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"langs",{enumerable:!0,configurable:!0,writable:!0,value:{en:{months:["January","February","March","April","May","June","July","August","September","October","November","December"],actions:{create:"Create",save:"Save",cancel:"Cancel",present:"Present",delete:"Delete"},labels:{description:"Description",section:"Section",period:"Time period"}},es:{months:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],actions:{create:"Crear",save:"Guardar",cancel:"Cancelar",present:"Presente",delete:"Borrar"},labels:{description:"Descripción",section:"Sección",period:"Periodo de tiempo"}}}}),Object.defineProperty(this,"getTextLang",{enumerable:!0,configurable:!0,writable:!0,value:e=>this.langs[this.lang][e]}),Object.defineProperty(this,"closeModalEvent",{enumerable:!0,configurable:!0,writable:!0,value:e=>{"Escape"===e.key&&this.closeModal()}}),Object.defineProperty(this,"appendSelectOptions",{enumerable:!0,configurable:!0,writable:!0,value:(e,t)=>{const n=document.createElement("option");n.innerText="-",n.value="",t.appendChild(n),e.forEach((e=>{const n=document.createElement("option");n.innerText=e.label,n.value=e.id,t.appendChild(n)}))}}),Object.defineProperty(this,"openModal",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=document.getElementsByTagName("body")[0],n=document.createElement("div");n.id=`${this.rootId}-modal`,n.classList.add("ssche__overlay"),n.innerHTML=`\n      <div class="ssche__modal_body">\n        <h2 class="ssche__modal_title">\n          ${this.getTextLang("actions").create}\n        </h2>\n        <div class="ssche__modal_content">\n          <div class="ssche__modal_form_row">\n            <label for="${this.rootId}-description" class="ssche__modal_input_label">\n              ${this.getTextLang("labels").description}\n            </label>\n            <textarea \n              rows="6"\n              id="${this.rootId}-description" \n              class="ssche__modal_input"\n              ></textarea>\n          </div>\n          <div class="ssche__modal_form_row">\n            <label for="${this.rootId}-section" class="ssche__modal_input_label">\n              ${this.getTextLang("labels").section}\n            </label>\n            <select \n              id="${this.rootId}-section" \n              class="ssche__modal_input"\n            ></select>\n          </div>\n          <div class="ssche__modal_form_row">\n            <label class="ssche__modal_input_label">\n              ${this.getTextLang("labels").period}\n            </label>\n            <div class="ssche__modal_double_row">\n              <div class="ssche__modal_range_row">\n                <input id="${this.rootId}-start-time" type="time" class="ssche__range-input" />\n                <input id="${this.rootId}-start-date" type="date" class="ssche" />\n              </div>\n              <div class="ssche__modal_range_row">\n                <input id="${this.rootId}-end-time" type="time" class="ssche__range-input"/>\n                <input id="${this.rootId}-end-date" type="date" class="ssche" />\n              </div>\n            </div>\n          </div>\n          <div class="ssche__modal_actions">\n          ${e&&!this.onlyRead?`\n            <button class="ssche__btn ssche__modal_btn_delete" id="${this.rootId}-modal-delete">\n              ${this.getTextLang("actions").delete}\n            </button>`:""}\n            <button class="ssche__btn ssche__modal_btn_cancel" id="${this.rootId}-modal-cancel">\n              ${this.getTextLang("actions").cancel}\n            </button>\n            ${this.onlyRead?"":`\n            <button class="ssche__btn ssche__modal_btn_save" id="${this.rootId}-modal-save">\n              ${this.getTextLang("actions").save}\n            </button>`}\n          </div>\n        </div>\n      </div>\n    `,t.appendChild(n),this.appendSelectOptions(this.rows,document.getElementById(`${this.rootId}-section`)),n.addEventListener("click",(e=>{e.target.id===`${this.rootId}-modal`&&this.closeModal()}));const r=document.getElementById(`${this.rootId}-modal-cancel`);r.addEventListener("click",this.closeModal,!0),this.onlyRead&&(r.style.marginRight="0px"),document.addEventListener("keydown",this.closeModalEvent,!0);const o=document.getElementById(`${this.rootId}-description`),i=document.getElementById(`${this.rootId}-section`),s=document.getElementById(`${this.rootId}-start-date`),a=document.getElementById(`${this.rootId}-end-date`),l=document.getElementById(`${this.rootId}-start-time`),d=document.getElementById(`${this.rootId}-end-time`),c=document.getElementById(`${this.rootId}-modal-save`);this.onlyRead?(o.disabled=!0,i.disabled=!0,l.disabled=!0,s.disabled=!0,d.disabled=!0,a.disabled=!0):(s.addEventListener("change",(e=>{a.min=e.target.value,c.disabled=""===s.value||""===a.value||""===i.value||""===o.value})),a.addEventListener("change",(e=>{s.max=e.target.value,c.disabled=""===s.value||""===a.value||""===i.value||""===o.value})),i.addEventListener("change",(()=>{c.disabled=""===s.value||""===a.value||""===i.value||""===o.value})),o.addEventListener("change",(()=>{c.disabled=""===s.value||""===a.value||""===i.value||""===o.value})),l.addEventListener("change",(e=>{const t=e.target.value;d.min=t;const n=new Date(0,0,0,+t.split(":")[0],+t.split(":")[1]);new Date(0,0,0,+d.value.split(":")[0],+d.value.split(":")[1]).getTime()<n.getTime()&&(d.value="")})),c.disabled=""===s.value||""===a.value||""===i.value||""===o.value,c.addEventListener("click",(()=>{const t={description:o.value,section:i.value,startTime:l.value,startDate:s.value,endTime:d.value,endDate:a.value};if(e){if(t.id=e.id,!this.editCallback)throw new Error("Callback 'onEventEdited' isn't defined.");this.editCallback(t)}else{if(!this.createCallback)throw new Error("Callback 'onEventCreated' isn't defined.");this.createCallback(t)}this.closeModal()}))),e&&(o.value=e.description,i.value=e.section,s.value=e.startDate,a.value=e.endDate,l.value=e.startTime,d.value=e.endTime,!this.onlyRead)&&(document.getElementById(`${this.rootId}-modal-delete`).addEventListener("click",(()=>{if(!this.deleteCallback)throw new Error("Callback 'onEventDeleted' isn't defined.");this.deleteCallback(e),this.closeModal()})),c.disabled=!1)}}),Object.defineProperty(this,"closeModal",{enumerable:!0,configurable:!0,writable:!0,value:()=>{const e=document.getElementsByTagName("body")[0],t=document.getElementById(`${this.rootId}-modal`);t&&e.removeChild(t),document.removeEventListener("keydown",this.closeModalEvent,!0)}}),Object.defineProperty(this,"isDrawableNow",{enumerable:!0,configurable:!0,writable:!0,value:e=>{if(e.year1>this.currentYear||e.year2<this.currentYear)return!1;const t=e.year1===e.year2;if(t&&(this.currentMonth<e.month1||e.month2<this.currentMonth))return!1;if(!t){if(this.currentYear===e.year1&&this.currentMonth<e.month1)return!1;if(this.currentYear===e.year2&&this.currentMonth>e.month2)return!1}return!0}}),Object.defineProperty(this,"updateCalendar",{enumerable:!0,configurable:!0,writable:!0,value:()=>{this.title&&(this.title.innerText=`${this.getTextLang("months")[this.currentMonth]} ${this.currentYear}`);const e=document.getElementById(`${this.rootId}-grid`);if(!this.rootId)throw new Error("Root HTML Element doesn't exists.");{const t=document.getElementById(this.rootId);if(t&&e){e&&t.removeChild(e);const n=new Date(this.currentYear,this.currentMonth+1,0);this.totalCols=n.getDate()+1,this.totalCells=this.rows.length*this.totalCols;const r=document.createElement("div");r.classList.add("ssche__grid"),r.id=`${this.rootId}-grid`,t.append(r),this.createGrid(),this.events.filter((e=>this.isDrawableNow(e))).forEach((e=>this.drawEvent(e)))}}}}),Object.defineProperty(this,"createHeading",{enumerable:!0,configurable:!0,writable:!0,value:()=>{const e=document.getElementById(`${this.rootId}-heading`);e&&(e.innerHTML=`\n        ${this.onlyRead?"<div></div>":`\n        <button id="${this.rootId}-btn-create" class="ssche__btn ssche__heading_button">\n          ${this.langs[this.lang].actions.create}\n        </button>`}\n        <h1 id="${this.rootId}-title">${this.getTextLang("months")[this.currentMonth]} ${this.currentYear}</h1>\n        <div class="ssche__heading_controls">\n          <div id="${this.rootId}-left-control" class="ssche__control ssche__control_side">\n            <\n          </div>\n          <div id="${this.rootId}-present-control" class="ssche__control">\n            ${this.getTextLang("actions").present}\n          </div>\n          <div id="${this.rootId}-right-control" class="ssche__control ssche__control_side">\n            >\n          </div>\n        </div>\n      `),this.onlyRead||document.getElementById(`${this.rootId}-btn-create`).addEventListener("click",(()=>this.openModal())),this.title=document.getElementById(`${this.rootId}-title`),document.getElementById(`${this.rootId}-left-control`).addEventListener("click",(()=>{this.currentMonth-=1,this.currentMonth<0&&(this.currentMonth=11,this.currentYear-=1),this.updateCalendar()})),document.getElementById(`${this.rootId}-right-control`).addEventListener("click",(()=>{this.currentMonth+=1,this.currentMonth>11&&(this.currentMonth=0,this.currentYear+=1),this.updateCalendar()})),document.getElementById(`${this.rootId}-present-control`).addEventListener("click",(()=>{const e=new Date;this.currentMonth=e.getMonth(),this.currentYear=e.getFullYear(),this.updateCalendar()}))}}),Object.defineProperty(this,"createCell",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=document.createElement("div");return t.classList.add("ssche__cell"),e&&(t.appendChild(document.createTextNode(e)),t.classList.add("ssche__cell_label")),t}}),Object.defineProperty(this,"createGrid",{enumerable:!0,configurable:!0,writable:!0,value:()=>{const e=document.getElementById(`${this.rootId}-grid`);e.style.gridTemplateColumns=`150px repeat(${this.totalCols-1}, minmax(32px, 1fr))`;for(let t=0;t<this.totalCols;t++){let n=document.createElement("div");n.classList.add("ssche__grid_heading_cell"),t>0&&(n.innerText=`${t}`),e.appendChild(n)}for(let t=0;t<this.totalCells;t++)e.appendChild(this.createCell(t%this.totalCols==0?this.rows[Math.floor(t/this.totalCols)].label:null));const t=e.childNodes[this.totalCols+1];this.cellWidth=t.getClientRects()[0].width,window.onresize=()=>{this.cellWidth=t.getClientRects()[0].width;const n=e.getElementsByClassName("ssche__event");for(let e=0;e<n.length;e++){const t=n[e].dataset.start||"0",r=+(n[e].dataset.end||"0")-+t;n[e].style.width=this.cellWidth*(r>0?r:1)+"px"}}}}),Object.defineProperty(this,"computeEvent",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=this.rows.map((e=>e.id)).indexOf(e.section)+1,n=e.startDate.split("-"),r=e.endDate.split("-"),o=new Date(+n[0],+n[1]-1,+n[2]),i=new Date(+r[0],+r[1]-1,+r[2]);return{id:e.id||"",event:e,section:t,day1:o.getDate(),day2:i.getDate(),month1:o.getMonth(),month2:i.getMonth(),year1:o.getFullYear(),year2:i.getFullYear()}}}),Object.defineProperty(this,"calculatePos",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=this.events.filter((t=>t.section===e.section));if(0===t.length)return 0;const n=t.reduce(((t,n)=>{if(n.id===e.id)return t;let r=!1,o=!1,i=!1,s=this.currentMonth===n.month1?n.day1:1,a=this.currentMonth===n.month2?n.day2:this.totalCols,l=this.currentMonth===e.month1?e.day1:1,d=this.currentMonth===e.month2?e.day2:this.totalCols;return n.month1!==n.month2||e.month1!==e.month2?(r=d>s&&l<s,o=l<a&&d>a,i=l>=s&&d<=a):(r=e.day2>n.day1&&e.day1<n.day1,o=e.day1<n.day2&&e.day2>n.day2,i=e.day1>=n.day1&&e.day2<=n.day2),r||o||i?[...t,n]:t}),[]).reduce(((e,t)=>{const n=document.querySelector(`div.ssche__event[data-id="${t.id}"]`);if(null===n)return e;const r=n.style.top;return[...e,+r.substring(0,r.length-2)]}),[]).sort(((e,t)=>e-t));if(0===n.length)return 0;let r=0;for(let e=1;e<n.length;e++)if(r=n[e],n[e]>n[e-1]+26){r=n[e-1]+26;break}return r===n[n.length-1]&&(r+=26),r}}),Object.defineProperty(this,"drawEvent",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=document.getElementById(`${this.rootId}-grid`);if(!t)throw new Error("Grid doesn't exists.");{const n=document.createElement("div");n.classList.add("ssche__event"),n.dataset.id=`${e.event.id}`,n.innerText=e.event.description,n.draggable=!0;let r=e.month1!==this.currentMonth?1:e.day1,o=e.month2!==this.currentMonth?this.totalCols:e.day2,i=this.totalCols*e.section+r,s=0;n.dataset.start=`${r}`,n.dataset.end=`${o}`,s=o-r,n.style.width=this.cellWidth*s-1+"px",n.addEventListener("click",(()=>this.openModal(e.event))),n.style.top=`${this.calculatePos(e)}px`;const a=t.childNodes[i];this.fixHeightFromChildren(a),a.appendChild(n)}}}),Object.defineProperty(this,"fixHeightFromChildren",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=e.childNodes;let n=0;t.forEach((e=>{const t=e.style.top||"0px",r=+t.substring(0,t.length-2);n<r&&(n=r)})),e.style.minHeight=`${n+26}px`}}),Object.defineProperty(this,"onEventCreated",{enumerable:!0,configurable:!0,writable:!0,value:e=>{this.createCallback=e}}),Object.defineProperty(this,"onEventDeleted",{enumerable:!0,configurable:!0,writable:!0,value:e=>{this.deleteCallback=e}}),Object.defineProperty(this,"onEventEdited",{enumerable:!0,configurable:!0,writable:!0,value:e=>{this.editCallback=e}}),Object.defineProperty(this,"addEvent",{enumerable:!0,configurable:!0,writable:!0,value:e=>{const t=this.computeEvent(e);this.isDrawableNow(t)&&this.drawEvent(t),this.events.push(t)}}),Object.defineProperty(this,"removeEvent",{enumerable:!0,configurable:!0,writable:!0,value:e=>{if(null==e)throw new Error(`Id not valid: ${e}`);{const t=document.querySelector(`div.ssche__event[data-id="${e}"]`);if(null===t)throw new Error(`No events with id: ${e}`);{const n=t.parentElement;this.currentYear,this.currentMonth,this.events=this.events.filter((t=>t.id!==e)),n.removeChild(t),this.fixHeightFromChildren(n)}}}}),this.rootId=e.root,this.onlyRead=e.onlyRead||!1;const t=document.getElementById(this.rootId);if(this.rows=e.rows,e.lang&&(this.lang=e.lang),!t)throw new Error("Root HTML Element doesn't exists.");t.classList.add("ssche__container");const n=new Date;n.setMonth(n.getMonth()+1),n.setDate(0),this.totalCols=n.getDate()+1,this.totalCells=this.rows.length*this.totalCols,t.innerHTML=`\n      <div id="${this.rootId}-heading" class="ssche__heading"></div>\n      <div id="${this.rootId}-grid" class="ssche__grid"></div>\n    `,this.createHeading(),this.createGrid()}}})(),r.default})()}));