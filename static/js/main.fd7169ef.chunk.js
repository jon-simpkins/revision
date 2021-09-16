(this.webpackJsonprevision=this.webpackJsonprevision||[]).push([[0],{12:function(t,e,r){var n,s,o;s=[r(169)],void 0===(o="function"===typeof(n=function(t){"use strict";var e=t.Reader,r=t.Writer,n=t.util,s=t.roots.default||(t.roots.default={});return s.Timestamp=function(){function o(t){if(t)for(var e=Object.keys(t),r=0;r<e.length;++r)null!=t[e[r]]&&(this[e[r]]=t[e[r]])}return o.prototype.seconds=0,o.prototype.nanos=0,o.create=function(t){return new o(t)},o.encode=function(t,e){return e||(e=r.create()),null!=t.seconds&&Object.hasOwnProperty.call(t,"seconds")&&e.uint32(8).int32(t.seconds),null!=t.nanos&&Object.hasOwnProperty.call(t,"nanos")&&e.uint32(16).int32(t.nanos),e},o.encodeDelimited=function(t,e){return this.encode(t,e).ldelim()},o.decode=function(t,r){t instanceof e||(t=e.create(t));for(var n=void 0===r?t.len:t.pos+r,o=new s.Timestamp;t.pos<n;){var i=t.uint32();switch(i>>>3){case 1:o.seconds=t.int32();break;case 2:o.nanos=t.int32();break;default:t.skipType(7&i)}}return o},o.decodeDelimited=function(t){return t instanceof e||(t=new e(t)),this.decode(t,t.uint32())},o.verify=function(t){return"object"!==typeof t||null===t?"object expected":null!=t.seconds&&t.hasOwnProperty("seconds")&&!n.isInteger(t.seconds)?"seconds: integer expected":null!=t.nanos&&t.hasOwnProperty("nanos")&&!n.isInteger(t.nanos)?"nanos: integer expected":null},o.fromObject=function(t){if(t instanceof s.Timestamp)return t;var e=new s.Timestamp;return null!=t.seconds&&(e.seconds=0|t.seconds),null!=t.nanos&&(e.nanos=0|t.nanos),e},o.toObject=function(t,e){e||(e={});var r={};return e.defaults&&(r.seconds=0,r.nanos=0),null!=t.seconds&&t.hasOwnProperty("seconds")&&(r.seconds=t.seconds),null!=t.nanos&&t.hasOwnProperty("nanos")&&(r.nanos=t.nanos),r},o.prototype.toJSON=function(){return this.constructor.toObject(this,t.util.toJSONOptions)},o}(),s.Duration=function(){function o(t){if(t)for(var e=Object.keys(t),r=0;r<e.length;++r)null!=t[e[r]]&&(this[e[r]]=t[e[r]])}return o.prototype.seconds=0,o.prototype.nanos=0,o.create=function(t){return new o(t)},o.encode=function(t,e){return e||(e=r.create()),null!=t.seconds&&Object.hasOwnProperty.call(t,"seconds")&&e.uint32(8).int32(t.seconds),null!=t.nanos&&Object.hasOwnProperty.call(t,"nanos")&&e.uint32(16).int32(t.nanos),e},o.encodeDelimited=function(t,e){return this.encode(t,e).ldelim()},o.decode=function(t,r){t instanceof e||(t=e.create(t));for(var n=void 0===r?t.len:t.pos+r,o=new s.Duration;t.pos<n;){var i=t.uint32();switch(i>>>3){case 1:o.seconds=t.int32();break;case 2:o.nanos=t.int32();break;default:t.skipType(7&i)}}return o},o.decodeDelimited=function(t){return t instanceof e||(t=new e(t)),this.decode(t,t.uint32())},o.verify=function(t){return"object"!==typeof t||null===t?"object expected":null!=t.seconds&&t.hasOwnProperty("seconds")&&!n.isInteger(t.seconds)?"seconds: integer expected":null!=t.nanos&&t.hasOwnProperty("nanos")&&!n.isInteger(t.nanos)?"nanos: integer expected":null},o.fromObject=function(t){if(t instanceof s.Duration)return t;var e=new s.Duration;return null!=t.seconds&&(e.seconds=0|t.seconds),null!=t.nanos&&(e.nanos=0|t.nanos),e},o.toObject=function(t,e){e||(e={});var r={};return e.defaults&&(r.seconds=0,r.nanos=0),null!=t.seconds&&t.hasOwnProperty("seconds")&&(r.seconds=t.seconds),null!=t.nanos&&t.hasOwnProperty("nanos")&&(r.nanos=t.nanos),r},o.prototype.toJSON=function(){return this.constructor.toObject(this,t.util.toJSONOptions)},o}(),s.Story=function(){function o(t){if(this.relatedStoryIds=[],t)for(var e=Object.keys(t),r=0;r<e.length;++r)null!=t[e[r]]&&(this[e[r]]=t[e[r]])}return o.prototype.id="",o.prototype.name="",o.prototype.description="",o.prototype.duration=null,o.prototype.relatedStoryIds=n.emptyArray,o.create=function(t){return new o(t)},o.encode=function(t,e){if(e||(e=r.create()),null!=t.id&&Object.hasOwnProperty.call(t,"id")&&e.uint32(10).string(t.id),null!=t.name&&Object.hasOwnProperty.call(t,"name")&&e.uint32(18).string(t.name),null!=t.duration&&Object.hasOwnProperty.call(t,"duration")&&s.Duration.encode(t.duration,e.uint32(26).fork()).ldelim(),null!=t.relatedStoryIds&&t.relatedStoryIds.length)for(var n=0;n<t.relatedStoryIds.length;++n)e.uint32(34).string(t.relatedStoryIds[n]);return null!=t.description&&Object.hasOwnProperty.call(t,"description")&&e.uint32(42).string(t.description),e},o.encodeDelimited=function(t,e){return this.encode(t,e).ldelim()},o.decode=function(t,r){t instanceof e||(t=e.create(t));for(var n=void 0===r?t.len:t.pos+r,o=new s.Story;t.pos<n;){var i=t.uint32();switch(i>>>3){case 1:o.id=t.string();break;case 2:o.name=t.string();break;case 5:o.description=t.string();break;case 3:o.duration=s.Duration.decode(t,t.uint32());break;case 4:o.relatedStoryIds&&o.relatedStoryIds.length||(o.relatedStoryIds=[]),o.relatedStoryIds.push(t.string());break;default:t.skipType(7&i)}}return o},o.decodeDelimited=function(t){return t instanceof e||(t=new e(t)),this.decode(t,t.uint32())},o.verify=function(t){if("object"!==typeof t||null===t)return"object expected";if(null!=t.id&&t.hasOwnProperty("id")&&!n.isString(t.id))return"id: string expected";if(null!=t.name&&t.hasOwnProperty("name")&&!n.isString(t.name))return"name: string expected";if(null!=t.description&&t.hasOwnProperty("description")&&!n.isString(t.description))return"description: string expected";if(null!=t.duration&&t.hasOwnProperty("duration")){var e=s.Duration.verify(t.duration);if(e)return"duration."+e}if(null!=t.relatedStoryIds&&t.hasOwnProperty("relatedStoryIds")){if(!Array.isArray(t.relatedStoryIds))return"relatedStoryIds: array expected";for(var r=0;r<t.relatedStoryIds.length;++r)if(!n.isString(t.relatedStoryIds[r]))return"relatedStoryIds: string[] expected"}return null},o.fromObject=function(t){if(t instanceof s.Story)return t;var e=new s.Story;if(null!=t.id&&(e.id=String(t.id)),null!=t.name&&(e.name=String(t.name)),null!=t.description&&(e.description=String(t.description)),null!=t.duration){if("object"!==typeof t.duration)throw TypeError(".Story.duration: object expected");e.duration=s.Duration.fromObject(t.duration)}if(t.relatedStoryIds){if(!Array.isArray(t.relatedStoryIds))throw TypeError(".Story.relatedStoryIds: array expected");e.relatedStoryIds=[];for(var r=0;r<t.relatedStoryIds.length;++r)e.relatedStoryIds[r]=String(t.relatedStoryIds[r])}return e},o.toObject=function(t,e){e||(e={});var r={};if((e.arrays||e.defaults)&&(r.relatedStoryIds=[]),e.defaults&&(r.id="",r.name="",r.duration=null,r.description=""),null!=t.id&&t.hasOwnProperty("id")&&(r.id=t.id),null!=t.name&&t.hasOwnProperty("name")&&(r.name=t.name),null!=t.duration&&t.hasOwnProperty("duration")&&(r.duration=s.Duration.toObject(t.duration,e)),t.relatedStoryIds&&t.relatedStoryIds.length){r.relatedStoryIds=[];for(var n=0;n<t.relatedStoryIds.length;++n)r.relatedStoryIds[n]=t.relatedStoryIds[n]}return null!=t.description&&t.hasOwnProperty("description")&&(r.description=t.description),r},o.prototype.toJSON=function(){return this.constructor.toObject(this,t.util.toJSONOptions)},o}(),s.Scrap=function(){function o(t){if(this.structure=[],this.brainstorm=[],this.stories=[],t)for(var e=Object.keys(t),r=0;r<e.length;++r)null!=t[e[r]]&&(this[e[r]]=t[e[r]])}return o.prototype.id="",o.prototype.intendedDurationSec=0,o.prototype.synopsis="",o.prototype.prose="",o.prototype.structure=n.emptyArray,o.prototype.brainstorm=n.emptyArray,o.prototype.stories=n.emptyArray,o.create=function(t){return new o(t)},o.encode=function(t,e){if(e||(e=r.create()),null!=t.id&&Object.hasOwnProperty.call(t,"id")&&e.uint32(10).string(t.id),null!=t.intendedDurationSec&&Object.hasOwnProperty.call(t,"intendedDurationSec")&&e.uint32(16).uint32(t.intendedDurationSec),null!=t.synopsis&&Object.hasOwnProperty.call(t,"synopsis")&&e.uint32(26).string(t.synopsis),null!=t.prose&&Object.hasOwnProperty.call(t,"prose")&&e.uint32(34).string(t.prose),null!=t.structure&&t.structure.length)for(var n=0;n<t.structure.length;++n)e.uint32(42).string(t.structure[n]);if(null!=t.brainstorm&&t.brainstorm.length)for(n=0;n<t.brainstorm.length;++n)e.uint32(58).string(t.brainstorm[n]);if(null!=t.stories&&t.stories.length)for(n=0;n<t.stories.length;++n)e.uint32(66).string(t.stories[n]);return e},o.encodeDelimited=function(t,e){return this.encode(t,e).ldelim()},o.decode=function(t,r){t instanceof e||(t=e.create(t));for(var n=void 0===r?t.len:t.pos+r,o=new s.Scrap;t.pos<n;){var i=t.uint32();switch(i>>>3){case 1:o.id=t.string();break;case 2:o.intendedDurationSec=t.uint32();break;case 3:o.synopsis=t.string();break;case 4:o.prose=t.string();break;case 5:o.structure&&o.structure.length||(o.structure=[]),o.structure.push(t.string());break;case 7:o.brainstorm&&o.brainstorm.length||(o.brainstorm=[]),o.brainstorm.push(t.string());break;case 8:o.stories&&o.stories.length||(o.stories=[]),o.stories.push(t.string());break;default:t.skipType(7&i)}}return o},o.decodeDelimited=function(t){return t instanceof e||(t=new e(t)),this.decode(t,t.uint32())},o.verify=function(t){if("object"!==typeof t||null===t)return"object expected";if(null!=t.id&&t.hasOwnProperty("id")&&!n.isString(t.id))return"id: string expected";if(null!=t.intendedDurationSec&&t.hasOwnProperty("intendedDurationSec")&&!n.isInteger(t.intendedDurationSec))return"intendedDurationSec: integer expected";if(null!=t.synopsis&&t.hasOwnProperty("synopsis")&&!n.isString(t.synopsis))return"synopsis: string expected";if(null!=t.prose&&t.hasOwnProperty("prose")&&!n.isString(t.prose))return"prose: string expected";if(null!=t.structure&&t.hasOwnProperty("structure")){if(!Array.isArray(t.structure))return"structure: array expected";for(var e=0;e<t.structure.length;++e)if(!n.isString(t.structure[e]))return"structure: string[] expected"}if(null!=t.brainstorm&&t.hasOwnProperty("brainstorm")){if(!Array.isArray(t.brainstorm))return"brainstorm: array expected";for(e=0;e<t.brainstorm.length;++e)if(!n.isString(t.brainstorm[e]))return"brainstorm: string[] expected"}if(null!=t.stories&&t.hasOwnProperty("stories")){if(!Array.isArray(t.stories))return"stories: array expected";for(e=0;e<t.stories.length;++e)if(!n.isString(t.stories[e]))return"stories: string[] expected"}return null},o.fromObject=function(t){if(t instanceof s.Scrap)return t;var e=new s.Scrap;if(null!=t.id&&(e.id=String(t.id)),null!=t.intendedDurationSec&&(e.intendedDurationSec=t.intendedDurationSec>>>0),null!=t.synopsis&&(e.synopsis=String(t.synopsis)),null!=t.prose&&(e.prose=String(t.prose)),t.structure){if(!Array.isArray(t.structure))throw TypeError(".Scrap.structure: array expected");e.structure=[];for(var r=0;r<t.structure.length;++r)e.structure[r]=String(t.structure[r])}if(t.brainstorm){if(!Array.isArray(t.brainstorm))throw TypeError(".Scrap.brainstorm: array expected");for(e.brainstorm=[],r=0;r<t.brainstorm.length;++r)e.brainstorm[r]=String(t.brainstorm[r])}if(t.stories){if(!Array.isArray(t.stories))throw TypeError(".Scrap.stories: array expected");for(e.stories=[],r=0;r<t.stories.length;++r)e.stories[r]=String(t.stories[r])}return e},o.toObject=function(t,e){e||(e={});var r={};if((e.arrays||e.defaults)&&(r.structure=[],r.brainstorm=[],r.stories=[]),e.defaults&&(r.id="",r.intendedDurationSec=0,r.synopsis="",r.prose=""),null!=t.id&&t.hasOwnProperty("id")&&(r.id=t.id),null!=t.intendedDurationSec&&t.hasOwnProperty("intendedDurationSec")&&(r.intendedDurationSec=t.intendedDurationSec),null!=t.synopsis&&t.hasOwnProperty("synopsis")&&(r.synopsis=t.synopsis),null!=t.prose&&t.hasOwnProperty("prose")&&(r.prose=t.prose),t.structure&&t.structure.length){r.structure=[];for(var n=0;n<t.structure.length;++n)r.structure[n]=t.structure[n]}if(t.brainstorm&&t.brainstorm.length)for(r.brainstorm=[],n=0;n<t.brainstorm.length;++n)r.brainstorm[n]=t.brainstorm[n];if(t.stories&&t.stories.length)for(r.stories=[],n=0;n<t.stories.length;++n)r.stories[n]=t.stories[n];return r},o.prototype.toJSON=function(){return this.constructor.toObject(this,t.util.toJSONOptions)},o}(),s.WritingWorkspace=function(){function o(t){if(this.stories=[],this.scraps=[],t)for(var e=Object.keys(t),r=0;r<e.length;++r)null!=t[e[r]]&&(this[e[r]]=t[e[r]])}return o.prototype.stories=n.emptyArray,o.prototype.scraps=n.emptyArray,o.create=function(t){return new o(t)},o.encode=function(t,e){if(e||(e=r.create()),null!=t.stories&&t.stories.length)for(var n=0;n<t.stories.length;++n)s.Story.encode(t.stories[n],e.uint32(10).fork()).ldelim();if(null!=t.scraps&&t.scraps.length)for(n=0;n<t.scraps.length;++n)s.Scrap.encode(t.scraps[n],e.uint32(18).fork()).ldelim();return e},o.encodeDelimited=function(t,e){return this.encode(t,e).ldelim()},o.decode=function(t,r){t instanceof e||(t=e.create(t));for(var n=void 0===r?t.len:t.pos+r,o=new s.WritingWorkspace;t.pos<n;){var i=t.uint32();switch(i>>>3){case 1:o.stories&&o.stories.length||(o.stories=[]),o.stories.push(s.Story.decode(t,t.uint32()));break;case 2:o.scraps&&o.scraps.length||(o.scraps=[]),o.scraps.push(s.Scrap.decode(t,t.uint32()));break;default:t.skipType(7&i)}}return o},o.decodeDelimited=function(t){return t instanceof e||(t=new e(t)),this.decode(t,t.uint32())},o.verify=function(t){if("object"!==typeof t||null===t)return"object expected";if(null!=t.stories&&t.hasOwnProperty("stories")){if(!Array.isArray(t.stories))return"stories: array expected";for(var e=0;e<t.stories.length;++e)if(r=s.Story.verify(t.stories[e]))return"stories."+r}if(null!=t.scraps&&t.hasOwnProperty("scraps")){if(!Array.isArray(t.scraps))return"scraps: array expected";for(e=0;e<t.scraps.length;++e){var r;if(r=s.Scrap.verify(t.scraps[e]))return"scraps."+r}}return null},o.fromObject=function(t){if(t instanceof s.WritingWorkspace)return t;var e=new s.WritingWorkspace;if(t.stories){if(!Array.isArray(t.stories))throw TypeError(".WritingWorkspace.stories: array expected");e.stories=[];for(var r=0;r<t.stories.length;++r){if("object"!==typeof t.stories[r])throw TypeError(".WritingWorkspace.stories: object expected");e.stories[r]=s.Story.fromObject(t.stories[r])}}if(t.scraps){if(!Array.isArray(t.scraps))throw TypeError(".WritingWorkspace.scraps: array expected");for(e.scraps=[],r=0;r<t.scraps.length;++r){if("object"!==typeof t.scraps[r])throw TypeError(".WritingWorkspace.scraps: object expected");e.scraps[r]=s.Scrap.fromObject(t.scraps[r])}}return e},o.toObject=function(t,e){e||(e={});var r={};if((e.arrays||e.defaults)&&(r.stories=[],r.scraps=[]),t.stories&&t.stories.length){r.stories=[];for(var n=0;n<t.stories.length;++n)r.stories[n]=s.Story.toObject(t.stories[n],e)}if(t.scraps&&t.scraps.length)for(r.scraps=[],n=0;n<t.scraps.length;++n)r.scraps[n]=s.Scrap.toObject(t.scraps[n],e);return r},o.prototype.toJSON=function(){return this.constructor.toObject(this,t.util.toJSONOptions)},o}(),s})?n.apply(e,s):n)||(t.exports=o)},160:function(t,e,r){},161:function(t,e,r){},186:function(t,e,r){"use strict";r.r(e);var n=r(0),s=r.n(n),o=r(37),i=r.n(o),a=(r(160),r(161),r(62)),c=r(63),u=r(77),l=r(75),d=r(30),p=r(202),f=r(84),y=r(2),h=function(t){Object(u.a)(r,t);var e=Object(l.a)(r);function r(){return Object(a.a)(this,r),e.apply(this,arguments)}return Object(c.a)(r,[{key:"render",value:function(){return Object(y.jsxs)(p.a,{children:[Object(y.jsx)(d.b,{to:"/",children:Object(y.jsx)(p.a.Item,{header:!0,children:"Revision"})}),Object(y.jsx)(d.b,{to:"/data",children:Object(y.jsx)(p.a.Item,{children:Object(y.jsx)(f.a,{name:"save"})})})]})}}]),r}(n.Component),j=r(10),b=r(204),O=function(t){Object(u.a)(r,t);var e=Object(l.a)(r);function r(){return Object(a.a)(this,r),e.apply(this,arguments)}return Object(c.a)(r,[{key:"getCardUrl",value:function(){return"/story/"+this.props.story.id}},{key:"render",value:function(){return Object(y.jsx)(d.b,{to:this.getCardUrl(),children:Object(y.jsxs)(b.a,{style:{margin:"8px"},children:[Object(y.jsx)(b.a.Content,{header:this.props.story.name}),Object(y.jsx)(b.a.Content,{children:this.props.story.description.split("\n").map((function(t,e){return Object(y.jsx)("p",{children:t},e)}))})]})})}}]),r}(n.Component),S=r(207),g=r(208),v=r(206),m=r(111),x=r(74),w=r(12),k="story-ids";function I(t){return"story-".concat(t)}function D(){return P().map((function(t){return function(t){var e=localStorage.getItem(I(t));if(!e)throw Error("Unable to read story ".concat(t," from local storage"));return w.Story.create(JSON.parse(e))}(t)}))}function P(){var t=localStorage.getItem(k)||"[]";return JSON.parse(t)}function A(t){localStorage.setItem(k,JSON.stringify(t))}function C(t){localStorage.setItem(I(t.id),JSON.stringify(t))}function W(t){C(t);var e=P();e.push(t.id),A(e)}var N=function(){var t={storyMap:{}};return D().forEach((function(e){t.storyMap[e.id]=e.toJSON()})),t}(),J="storyList",E=Object(x.b)({name:J,initialState:N,reducers:{createStory:function(t,e){t.storyMap[e.payload.id]=e.payload},updateStory:function(t,e){t.storyMap[e.payload.id]=e.payload},removeStory:function(t,e){delete t.storyMap[e.payload]}}}),T=function(t){return function(t){return function(e){var r=t(e);return e.type.startsWith("storyList/")&&M(e),r}}},M=function(t){switch(t.type){case"".concat(J,"/createStory"):W(t.payload);break;case"".concat(J,"/updateStory"):C(t.payload);break;case"".concat(J,"/removeStory"):e=t.payload,A(P().filter((function(t){return t!==e}))),localStorage.removeItem(I(e))}var e},F=function(t){for(var e={},r=0,n=Object.entries(t.storyList.storyMap);r<n.length;r++){var s=Object(m.a)(n[r],2),o=s[0],i=s[1];e[o]=w.Story.fromObject(i)}return e},L=E.actions,U=L.createStory,B=L.updateStory,G=L.removeStory,H=E.reducer,z=r(89),V=function(){return Object(z.b)()},R=z.c,$=r(205),_="scrap-ids";function q(t){return"scrap-".concat(t)}function K(){return Q().map((function(t){return function(t){var e=localStorage.getItem(q(t));if(!e)throw Error("Unable to read scrap ".concat(t," from local storage"));return w.Scrap.create(JSON.parse(e))}(t)}))}function Q(){var t=localStorage.getItem(_)||"[]";return JSON.parse(t)}function X(t){localStorage.setItem(_,JSON.stringify(t))}function Y(t){localStorage.setItem(q(t.id),JSON.stringify(t))}function Z(t){Y(t);var e=Q();e.push(t.id),X(e)}var tt=function(){var t={scrapMap:{}};return K().forEach((function(e){t.scrapMap[e.id]=e.toJSON()})),t}(),et="scrapList",rt=Object(x.b)({name:et,initialState:tt,reducers:{createScrap:function(t,e){t.scrapMap[e.payload.id]=e.payload},updateScrap:function(t,e){t.scrapMap[e.payload.id]=e.payload},removeScrap:function(t,e){delete t.scrapMap[e.payload]}}}),nt=function(t){return function(t){return function(e){var r=t(e);return e.type.startsWith("scrapList/")&&st(e),r}}},st=function(t){switch(t.type){case"".concat(et,"/createScrap"):Z(t.payload);break;case"".concat(et,"/updateScrap"):Y(t.payload);break;case"".concat(et,"/removeScrap"):e=t.payload,X(Q().filter((function(t){return t!==e}))),localStorage.removeItem(q(e))}var e},ot=function(t){for(var e={},r=0,n=Object.entries(t.scrapList.scrapMap);r<n.length;r++){var s=Object(m.a)(n[r],2),o=s[0],i=s[1];e[o]=w.Scrap.fromObject(i)}return e},it=rt.actions,at=it.createScrap,ct=it.updateScrap,ut=(it.removeScrap,rt.reducer);function lt(t){var e=Object.values(t);return e.length?Object(y.jsx)(S.a,{style:{display:"flex",flexWrap:"wrap"},children:e.map((function(t,e){return Object(y.jsx)(O,{story:t},e)}))}):Object(y.jsx)(S.a,{children:"Whoops, no stories yet"})}function dt(){var t=R(F),e=V(),r=Object(j.f)();return Object(y.jsx)("div",{style:{margin:"24px"},children:Object(y.jsxs)(S.a.Group,{children:[Object(y.jsxs)(S.a,{style:{display:"flex"},children:[Object(y.jsxs)(g.a,{size:"medium",children:["Story List",Object(y.jsx)(g.a.Subheader,{children:"All your stories"})]}),Object(y.jsx)("div",{style:{flex:1,textAlign:"right"},children:Object(y.jsx)(v.a,{icon:!0,color:"green",onClick:function(){var t=w.Story.create({id:Object($.a)(),name:"New Story",description:"A story about something"}).toJSON();e(U(t));var n,s=(n=t.id,w.Scrap.create({id:Object($.a)(),synopsis:"Story Content",prose:"Here is where you can summarize the story, and start to structure / brainstorm\nFeel free to create new scraps for alternative starting points, or new supporting docs for this story.",stories:[n]}).toJSON());e(at(s)),r.push("/story/".concat(t.id))},children:Object(y.jsx)(f.a,{name:"add"})})})]}),lt(t)]})})}var pt=r(58),ft=r(199),yt=r(203),ht=r(200),jt=r(201),bt=function(t){Object(u.a)(r,t);var e=Object(l.a)(r);function r(){var t;Object(a.a)(this,r);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(t=e.call.apply(e,[this].concat(s))).state={durationErrorString:null,currentScrapFilter:"mine",currentScrapId:""},t}return Object(c.a)(r,[{key:"onNameChange",value:function(t){var e=this.props.story;e.name=t,this.props.onStoryChange(e)}},{key:"onDescriptionChange",value:function(t){var e=this.props.story;e.description=t,this.props.onStoryChange(e)}},{key:"getDurationString",value:function(){var t,e,r=(null===(t=this.props.story)||void 0===t||null===(e=t.duration)||void 0===e?void 0:e.seconds)||0,n="",s=Math.floor(r/3600);r-=3600*s,n+=s.toString().padStart(2,"0")+":";var o=Math.floor(r/60);return r-=60*o,n+=o.toString().padStart(2,"0")+":",n+=r.toString().padStart(2,"0")}},{key:"onDurationChange",value:function(t){if(!new RegExp("^[0-9:]+$").test(t))return this.setDurationErrorString(!0);var e=t.split(":").filter(Boolean);if(e.length>3)return this.setDurationErrorString(!0);for(var r=0,n=0;n<e.length;n++)r=60*r+parseInt(e[n],10);var s=this.props.story;s.duration=w.Duration.create({seconds:r}),this.props.onStoryChange(s),this.setDurationErrorString(!1)}},{key:"setDurationErrorString",value:function(t){this.setState((function(e){return Object(pt.a)(Object(pt.a)({},e),{},{durationErrorString:t?"Please enter a duration of format HH:MM:SS":null})}))}},{key:"getFilteredScraps",value:function(t){var e=this;return this.props.scraps.filter((function(r){var n,s;return!("mine"===t&&r.stories.indexOf((null===(n=e.props.story)||void 0===n?void 0:n.id)||"")<0)&&!("others"===t&&r.stories.indexOf((null===(s=e.props.story)||void 0===s?void 0:s.id)||"")>=0)}))}},{key:"createNewScrap",value:function(){var t,e;return w.Scrap.create({id:Object($.a)(),synopsis:"New Scrap",prose:'New scrap for "'+(null===(t=this.props.story)||void 0===t?void 0:t.name)+'" story\nFill this out with notes or prose content',stories:[null===(e=this.props.story)||void 0===e?void 0:e.id]})}},{key:"renderScrapDetails",value:function(){var t,e,r=this,n=this.props.scraps.find((function(t){return t.id===r.state.currentScrapId}));return n?(e=n.stories.indexOf((null===(t=this.props.story)||void 0===t?void 0:t.id)||"")>=0?Object(y.jsx)(v.a,{icon:!0,color:"red",onClick:function(){var t=n;t.stories=t.stories.filter((function(t){var e;return t!==(null===(e=r.props.story)||void 0===e?void 0:e.id)})),r.props.onScrapUpdate(t)},children:Object(y.jsx)(f.a,{name:"unlink"})}):Object(y.jsx)(v.a,{icon:!0,color:"green",onClick:function(){var t,e=n;e.stories.push((null===(t=r.props.story)||void 0===t?void 0:t.id)||""),r.props.onScrapUpdate(e)},children:Object(y.jsx)(f.a,{name:"linkify"})}),Object(y.jsxs)("div",{children:[Object(y.jsxs)("div",{style:{display:"flex"},children:[Object(y.jsx)(g.a,{children:n.synopsis}),Object(y.jsx)("div",{style:{flex:1,textAlign:"right"},children:e})]}),Object(y.jsx)(ft.a,{text:!0,children:n.prose.split("\n").map((function(t,e){return Object(y.jsx)("p",{children:t},"line-"+e)}))}),Object(y.jsx)("div",{style:{marginTop:"32px"},children:Object(y.jsx)(d.b,{to:"/scrap/".concat(n.id),children:Object(y.jsx)(v.a,{primary:!0,children:"Start writing"})})})]})):Object(y.jsx)(g.a,{children:"Please select a scrap"})}},{key:"render",value:function(){var t=this;return this.props.story?Object(y.jsxs)("div",{style:{margin:"24px"},children:[Object(y.jsxs)(S.a.Group,{children:[Object(y.jsxs)(S.a,{style:{display:"flex"},children:[Object(y.jsxs)(g.a,{children:["Story Details",Object(y.jsx)(g.a.Subheader,{children:"Set the title, top-level description here"})]}),Object(y.jsx)("div",{style:{flex:1,textAlign:"right"},children:Object(y.jsx)(v.a,{icon:!0,color:"red",onClick:function(){return t.props.onStoryDelete()},children:Object(y.jsx)(f.a,{name:"delete"})})})]}),Object(y.jsx)(S.a,{children:Object(y.jsxs)(yt.a,{children:[Object(y.jsxs)(yt.a.Group,{widths:"equal",children:[Object(y.jsx)(yt.a.Input,{label:"Story Name",defaultValue:this.props.story.name,onChange:function(e){return t.onNameChange(e.target.value)}}),Object(y.jsx)(yt.a.Input,{label:"Intended Duration (HH:MM:SS)",defaultValue:this.getDurationString(),error:this.state.durationErrorString,onChange:function(e){return t.onDurationChange(e.target.value)}})]}),Object(y.jsxs)(yt.a.Field,{children:[Object(y.jsx)("label",{children:"Story Description"}),Object(y.jsx)(ht.a,{defaultValue:this.props.story.description,onChange:function(e){return t.onDescriptionChange(e.target.value)},style:{fontFamily:"CourierPrime",height:"125px"}})]})]})})]}),Object(y.jsxs)(S.a.Group,{children:[Object(y.jsxs)(S.a,{style:{display:"flex"},children:[Object(y.jsxs)(g.a,{children:["Scraps",Object(y.jsx)(g.a.Subheader,{children:"These are the bits and pieces that make up the story"})]}),Object(y.jsx)("div",{style:{flex:1,textAlign:"right"},children:Object(y.jsx)(v.a,{icon:!0,color:"green",onClick:function(){t.props.onScrapCreate(t.createNewScrap())},children:Object(y.jsx)(f.a,{name:"add"})})})]}),Object(y.jsxs)(S.a,{style:{display:"flex"},children:[Object(y.jsxs)(p.a,{pointing:!0,vertical:!0,children:[Object(y.jsx)(p.a.Item,{children:Object(y.jsx)(jt.a,{fluid:!0,selection:!0,onChange:function(e,r){var n=r.value;t.setState(Object(pt.a)(Object(pt.a)({},t.state),{},{currentScrapFilter:n}))},defaultValue:this.state.currentScrapFilter,options:[{value:"all",text:"All stories",description:""+this.getFilteredScraps("all").length},{value:"mine",text:"This story",description:""+this.getFilteredScraps("mine").length},{value:"others",text:"Other stories",description:""+this.getFilteredScraps("others").length}]})}),this.getFilteredScraps(this.state.currentScrapFilter).map((function(e,r){return Object(y.jsx)(p.a.Item,{name:e.id,active:e.id===t.state.currentScrapId,onClick:function(){return t.setState(Object(pt.a)(Object(pt.a)({},t.state),{},{currentScrapId:e.id}))},children:e.synopsis},"scrap-menu-"+r)})).filter(Boolean)]}),Object(y.jsx)("div",{style:{flex:1,marginLeft:"32px"},children:this.renderScrapDetails()})]})]})]}):Object(y.jsx)("div",{children:"Whoops, could not find story"})}}]),r}(n.Component);function Ot(t){var e,r,n=R((r=null===(e=t.match.params)||void 0===e?void 0:e.id,function(t){var e=t.storyList.storyMap[r];return e?w.Story.create(e):null})),s=Object.values(R(ot)),o=V(),i=Object(j.f)();return Object(y.jsx)(bt,{story:n,scraps:s,onStoryChange:function(t){return o(B(t.toJSON()))},onStoryDelete:function(){o(G(n.id)),i.push("/")},onScrapCreate:function(t){o(at(t.toJSON())),i.push("/scrap/"+t.id)},onScrapUpdate:function(t){o(ct(t.toJSON()))}})}var St=r(128),gt=r.n(St),vt=r(140),mt=r(141),xt=r.n(mt);function wt(){var t="writing_workspace_"+Date.now()+".write";xt()(function(){var t=w.WritingWorkspace.create({stories:D(),scraps:K()});return w.WritingWorkspace.encode(t).finish()}(),t)}function kt(){return(kt=Object(vt.a)(gt.a.mark((function t(e){var r;return gt.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,e[0].arrayBuffer();case 4:r=t.sent,It(new Uint8Array(r)),window.location.reload();case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function It(t){var e=w.WritingWorkspace.decode(t);localStorage.clear(),e.stories.forEach((function(t){W(t)})),e.scraps.forEach((function(t){Z(t)}))}function Dt(){var t=R(F);return Object(y.jsx)("div",{style:{margin:"24px"},children:Object(y.jsxs)(S.a.Group,{children:[Object(y.jsx)(S.a,{style:{display:"flex"},children:Object(y.jsxs)(g.a,{size:"medium",children:["Data Management",Object(y.jsx)(g.a.Subheader,{children:"Load, Save, or Clear your Workspace"})]})}),Object(y.jsxs)(S.a,{children:[Object.keys(t).length," Stories"]}),Object(y.jsxs)(S.a,{children:[Object(y.jsx)(v.a,{color:"green",onClick:function(){wt()},children:"Download Workspace"}),Object(y.jsx)(v.a,{color:"red",onClick:function(){localStorage.clear(),window.location.reload()},children:"Clear Workspace"})]}),Object(y.jsxs)(S.a,{children:[Object(y.jsx)(g.a,{size:"small",children:"Upload Workspace"}),Object(y.jsx)("input",{type:"file",accept:".write",onChange:function(t){return function(t){return kt.apply(this,arguments)}(t.target.files)}})]})]})})}function Pt(t){return Object(y.jsxs)("div",{children:["This will be details for scrap ",t.match.params.id]})}var At=function(){return Object(y.jsxs)(d.a,{children:[Object(y.jsx)(h,{}),Object(y.jsxs)(j.c,{children:[Object(y.jsx)(j.a,{path:"/data",component:Dt}),Object(y.jsx)(j.a,{path:"/story/:id",component:Ot}),Object(y.jsx)(j.a,{path:"/scrap/:id",component:Pt}),Object(y.jsx)(j.a,{path:"/",component:dt})]})]})},Ct=Object(x.a)({reducer:{storyList:H,scrapList:ut},middleware:function(t){return t().concat([T,nt])}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r(185);i.a.render(Object(y.jsx)(s.a.StrictMode,{children:Object(y.jsx)(z.a,{store:Ct,children:Object(y.jsx)(At,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[186,1,2]]]);
//# sourceMappingURL=main.fd7169ef.chunk.js.map