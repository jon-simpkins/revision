(this.webpackJsonprevision=this.webpackJsonprevision||[]).push([[0],{101:function(e,t,n){},106:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(20),o=n.n(r),s=(n(95),n.p+"static/media/logo.b2e5a01e.svg"),i=n(81),u=n(50),l=u.c,d=n(68),b=n.n(d),j=n(78),m=n(51);function h(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return new Promise((function(t){return setTimeout((function(){return t({data:e})}),500)}))}var v=Object(m.b)("counter/fetchCount",function(){var e=Object(j.a)(b.a.mark((function e(t){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h(t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),x=Object(m.c)({name:"counter",initialState:{value:0,status:"idle"},reducers:{increment:function(e){e.value+=1},decrement:function(e){e.value-=1},incrementByAmount:function(e,t){e.value+=t.payload}},extraReducers:function(e){e.addCase(v.pending,(function(e){e.status="loading"})).addCase(v.fulfilled,(function(e,t){e.status="idle",e.value+=t.payload}))}}),f=x.actions,O=f.increment,p=f.decrement,_=f.incrementByAmount,g=function(e){return e.counter.value},C=x.reducer,w=n(19),N=n.n(w),A=n(5);function k(){var e=l(g),t=Object(u.b)(),n=Object(a.useState)("2"),c=Object(i.a)(n,2),r=c[0],o=c[1],s=Number(r)||0;return Object(A.jsxs)("div",{children:[Object(A.jsxs)("div",{className:N.a.row,children:[Object(A.jsx)("button",{className:N.a.button,"aria-label":"Decrement value",onClick:function(){return t(p())},children:"-"}),Object(A.jsx)("span",{className:N.a.value,children:e}),Object(A.jsx)("button",{className:N.a.button,"aria-label":"Increment value",onClick:function(){return t(O())},children:"+"})]}),Object(A.jsxs)("div",{className:N.a.row,children:[Object(A.jsx)("input",{className:N.a.textbox,"aria-label":"Set increment amount",value:r,onChange:function(e){return o(e.target.value)}}),Object(A.jsx)("button",{className:N.a.button,onClick:function(){return t(_(s))},children:"Add Amount"}),Object(A.jsx)("button",{className:N.a.asyncButton,onClick:function(){return t(v(s))},children:"Add Async"}),Object(A.jsx)("button",{className:N.a.button,onClick:function(){return t((e=s,function(t,n){g(n())%2===1&&t(_(e))}));var e},children:"Add If Odd"})]})]})}var y=n(119),B=n(45),S=n(80);n(101);var I=function(){return Object(A.jsxs)("div",{className:"App",children:[Object(A.jsxs)("header",{className:"App-header",children:[Object(A.jsx)("img",{src:s,className:"App-logo",alt:"logo"}),Object(A.jsx)(k,{}),Object(A.jsxs)("p",{children:["Edit ",Object(A.jsx)("code",{children:"src/App.tsx"})," and save to reload."]})]}),Object(A.jsx)("div",{className:"Semantic-example",children:Object(A.jsxs)(y.a,{as:"div",labelPosition:"right",children:[Object(A.jsxs)(y.a,{icon:!0,children:[Object(A.jsx)(B.a,{name:"heart"}),"Like"]}),Object(A.jsx)(S.a,{as:"a",basic:!0,pointing:"left",children:"2,048"})]})})]})},D=Object(m.a)({reducer:{counter:C}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(105);o.a.render(Object(A.jsx)(c.a.StrictMode,{children:Object(A.jsx)(u.a,{store:D,children:Object(A.jsx)(I,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},19:function(e,t,n){e.exports={row:"Counter_row__1C_4f",value:"Counter_value__1d0te",button:"Counter_button__1xpSV",textbox:"Counter_textbox__3ODaX",asyncButton:"Counter_asyncButton__2UAr3 Counter_button__1xpSV"}},95:function(e,t,n){}},[[106,1,2]]]);
//# sourceMappingURL=main.75a96234.chunk.js.map