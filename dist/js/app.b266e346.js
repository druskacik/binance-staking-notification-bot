(function(e){function t(t){for(var a,o,r=t[0],c=t[1],l=t[2],p=0,f=[];p<r.length;p++)o=r[p],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&f.push(s[o][0]),s[o]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);u&&u(t);while(f.length)f.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,r=1;r<n.length;r++){var c=n[r];0!==s[c]&&(a=!1)}a&&(i.splice(t--,1),e=o(o.s=n[0]))}return e}var a={},s={app:0},i=[];function o(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=a,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=t,r=r.slice();for(var l=0;l<r.length;l++)t(r[l]);var u=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"06c3":function(e,t,n){},"0d9e":function(e,t,n){"use strict";n("cb6b")},2214:function(e,t,n){},4252:function(e,t,n){"use strict";n("fc32")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view"),n("the-footer")],1)},i=[],o=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-footer"},[n("div",[e._v(" Contact: https://t.me/rdruska ")])])}],c=(n("dbae"),n("2877")),l={},u=Object(c["a"])(l,o,r,!1,null,"6ba84219",null),p=u.exports,f={name:"app",components:{TheFooter:p}},b=f,d=(n("034f"),Object(c["a"])(b,s,i,!1,null,null,null)),m=d.exports,h=(n("20c5"),n("bb76")),v=(n("a71a"),n("b558")),_=(n("e1f5"),n("5efb")),g=n("8c4f"),w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("app-header"),n("div",{staticClass:"home__description-and-form"},[n("div",{staticClass:"home__description-and-form__element"},[n("app-description")],1),n("div",{staticClass:"home__description-and-form__element"},[n("app-form")],1)])],1)},k=[],y=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},x=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-header"},[n("div",{staticClass:"logo"},[e._v(" BinanceStaking"),n("span",{staticClass:"app-header__logo--black"},[e._v("Watcher")])])])}],C={name:"app-header"},j=C,O=(n("61b6"),Object(c["a"])(j,y,x,!1,null,"ac531cf0",null)),T=O.exports,E=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},I=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"description"},[n("div",{staticClass:"description__content"},[n("h1",[e._v(" Binance Staking Notification Bot ")]),n("p",[e._v(" Cryptocurrency staking offers a convenient way to earn interest on longer-term crypto holdings. The staking programs offered by Binance, the biggest cryptocurrency exchange by market cap, are usually under high demand and the most lucrative staking options are sold out most of the time. Binance doesn’t have a built-in system that would notify users about availability of its staking options. This bot provides this service by sending email or Telegram notification immediately after a specified staking option, which was previously sold out, becomes avaliable. This is possible by constant monitoring of the Binance website ( "),n("a",{attrs:{href:"https://www.binance.com/en/pos",target:"_blank"}},[e._v(" https://www.binance.com/en/pos ")]),e._v(" ). ")]),n("p",[e._v(" Currently it's not possible to track programs with specific length - if you follow e.g. BNB currency and it includes staking options for 30, 60 and 90 days, you will get notified when any of them becomes available. ")]),n("p",[e._v(" To take part, just fill in the form on this website to begin receiving notifications on your email. Or alternatively, chat up with our bot at "),n("a",{attrs:{href:"https://t.me/bstaking_bot",target:"_blank"}},[e._v(" https://t.me/bstaking_bot ")]),e._v(" and follow his instructions to set up notifications on Telegram. ")]),n("h1",{staticClass:"description__content__header"},[e._v(" About project ")]),n("p",[e._v(" The code behind this bot is available on Github: "),n("a",{attrs:{href:"https://github.com/druskacik/binance-staking-notification-bot",target:"_blank"}},[e._v(" https://github.com/druskacik/binance-staking-notification-bot ")]),e._v(". ")]),n("p",[e._v(" Providing this bot publicly to everyone may seem anti-purpose, but as long as the community using it remains small it will not be a problem. If the demand will be too high, I will consider what are my options. ")]),n("p",[e._v(" If you want to provide any feedback or suggestions, the fastest way to contact me is via Telegram: "),n("a",{attrs:{href:"https://t.me/rdruska",target:"_blank"}},[e._v(" https://t.me/rdruska ")]),e._v(". ")]),n("p",[e._v(" Support development of this project: ")]),n("div",{staticClass:"description__addresses"},[n("div",[e._v(" BTC: 1DkQTzGvYvqzjHFYc5Zejx9ZUNE9NbxKBv ")]),n("div",[e._v(" ETH: 0xa58bccec9364c22d2a6e5e8e30b056ff9a0dfc7c ")]),n("div",[e._v(" LTC: LViYjGcuqEwRGFrWieL4NwMTXq1Fng5XBM ")])])])])])}],B={name:"app-description"},N=B,S=(n("d658"),Object(c["a"])(N,E,I,!1,null,"a0df5288",null)),$=S.exports,A=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-form"},[n("h1",[e._v("Set up notifications")]),e._m(0),n("div",{staticClass:"app-form__email-input"},[n("label",{staticClass:"app-form__label"},[e._v("Email address: ")]),n("a-input",{staticClass:"app-form__email-input__field",attrs:{placeholder:"@"},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),n("div",{staticClass:"app-form__new-assets-checkbox"},[n("a-checkbox",{model:{value:e.subscribeNewAssets,callback:function(t){e.subscribeNewAssets=t},expression:"subscribeNewAssets"}},[e._v(" Notify me about new currencies that can be staked on Binance ")])],1),n("div",[n("div",{staticClass:"app-form__assets-checkbox-group__label"},[e._v(" Notify me about availability of staking options in following currencies: ")]),n("a-checkbox-group",{staticClass:"app-form__assets-checkbox-group",on:{change:e.assetIDChecked},model:{value:e.assetsIDs,callback:function(t){e.assetsIDs=t},expression:"assetsIDs"}},e._l(e.options,(function(t){return n("div",{key:t.value,staticClass:"app-form__assets-checkbox-group__checkbox"},[n("a-checkbox",{attrs:{value:t.value}},[e._v(" "+e._s(t.label)+" ")])],1)})),0)],1),n("app-form-submit-button",{attrs:{onClick:e.submitRequest,loading:e.loading}})],1)},D=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" To set up email notifications, fill in the form below. To receive notifications on Telegram, chat up with the bot at "),n("a",{attrs:{href:"https://t.me/bstaking_bot",target:"_blank"}},[e._v(" https://t.me/bstaking_bot ")]),e._v(". ")])}],P=(n("04f3"),n("ed3b")),F=n("1da1"),R=(n("caad"),n("2532"),n("d81d"),n("96cf"),n("bc3a")),M=n.n(R),q={apiUrl:"https://bswatcher.com"},H=q,G=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-form__submit-section"},[n("a-button",{staticClass:"app-form__submit-button",attrs:{type:"primary",loading:e.loading},on:{click:e.onClick}},[n("span",{staticClass:"app-form__submit-button__text"},[e._v(" Submit ")])]),n("div",{staticClass:"app-form__submit-section--text"},[e._v(" It's free ! ")])],1)},U=[],L={name:"app-header",props:{onClick:Function,loading:Boolean}},V=L,Y=(n("7657"),Object(c["a"])(V,G,U,!1,null,"677dcb42",null)),z=Y.exports,J={components:{AppFormSubmitButton:z},name:"app-form",data:function(){return{email:"",options:[],subscribeNewAssets:!1,assetsIDs:[],loading:!1}},methods:{assetIDChecked:function(e){console.log("checked = ",e)},submitRequest:function(){var e=this;return Object(F["a"])(regeneratorRuntime.mark((function t(){var n,a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,e.emailIsValid(e.email)){t.next=4;break}return e.warning("Please enter valid email address !"),t.abrupt("return");case 4:if(e.subscribeNewAssets||0!==e.assetsIDs.length){t.next=7;break}return e.warning("Please select at least something which you will subscribe !"),t.abrupt("return");case 7:return e.loading=!0,n={email:e.email,subscribeNewAssets:e.subscribeNewAssets,subscribedAssetsIDs:e.assetsIDs},a="".concat(H.apiUrl,"/api/subscription/create"),t.next=12,M.a.post(a,n);case 12:s=t.sent,console.log(s.data),e.loading=!1,e.success(),t.next=22;break;case 18:t.prev=18,t.t0=t["catch"](0),e.loading=!1,e.error();case 22:case"end":return t.stop()}}),t,null,[[0,18]])})))()},success:function(){var e=this.$createElement;P["a"].success({title:"Success",content:e("div",[e("p",["To confirm notification subscription, click on the link in the email we just sent you."])])})},error:function(){var e=this.$createElement;P["a"].error({title:"Error !",content:e("div",[e("p",["Something went wrong, please try again later."])])})},warning:function(e){P["a"].warning({title:e})},emailIsValid:function(e){return 0!==e.length&&!!e.includes("@")}},created:function(){var e=this;return Object(F["a"])(regeneratorRuntime.mark((function t(){var n,a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,n="".concat(H.apiUrl,"/api/get-staking-info"),t.next=4,M.a.get(n);case 4:a=t.sent,s=a.data.map((function(e){return{label:e.asset_name,value:e.id}})),s.sort((function(e,t){return e.label<t.label?-1:e.label>t.label?1:0})),e.options=s,t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](0),console.log(t.t0);case 13:case"end":return t.stop()}}),t,null,[[0,10]])})))()}},W=J,X=(n("0d9e"),Object(c["a"])(W,A,D,!1,null,"5af439f4",null)),Z=X.exports,K={name:"Home",components:{AppHeader:T,AppDescription:$,AppForm:Z}},Q=K,ee=(n("4252"),Object(c["a"])(Q,w,k,!1,null,"6e8f6789",null)),te=ee.exports;a["a"].use(_["a"]),a["a"].use(v["a"]),a["a"].use(h["a"]),a["a"].use(g["a"]);var ne=[{path:"/",name:"Home",component:te}],ae=new g["a"]({mode:"history",base:"/",routes:ne}),se=ae,ie=n("2f62");a["a"].use(ie["a"]);var oe=new ie["a"].Store({state:{},mutations:{},actions:{},modules:{}});a["a"].config.productionTip=!1,new a["a"]({router:se,store:oe,render:function(e){return e(m)}}).$mount("#app")},"596e":function(e,t,n){},"61b6":function(e,t,n){"use strict";n("ced3")},7657:function(e,t,n){"use strict";n("06c3")},"85ec":function(e,t,n){},cb6b:function(e,t,n){},ced3:function(e,t,n){},d658:function(e,t,n){"use strict";n("2214")},dbae:function(e,t,n){"use strict";n("596e")},fc32:function(e,t,n){}});
//# sourceMappingURL=app.b266e346.js.map