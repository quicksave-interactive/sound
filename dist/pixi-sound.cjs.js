/*!
 * @pixi/sound - v4.0.1
 * https://github.com/pixijs/pixi-sound
 * Compiled Thu, 08 Apr 2021 19:48:35 UTC
 *
 * @pixi/sound is licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license
 */
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e,t=require("@pixi/loaders"),n=require("@pixi/utils"),o=require("@pixi/ticker"),i=require("@pixi/core");function r(){return e}var s=function(e,t){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)};function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}s(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var a=function(){return(a=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},c=["mp3","ogg","oga","opus","mpeg","wav","m4a","aiff","wma","mid","caf"],p={};function h(e){var t=a({m4a:"audio/mp4",oga:"audio/ogg",opus:'audio/ogg; codecs="opus"',caf:'audio/x-caf; codecs="opus"'},e||{}),n=document.createElement("audio"),o={},i=/^no$/;c.forEach((function(e){var r=n.canPlayType("audio/"+e).replace(i,""),s=t[e]?n.canPlayType(t[e]).replace(i,""):"";o[e]=!!r||!!s})),Object.assign(p,o)}h();var l=/\.(\{([^\}]+)\})(\?.*)?$/;function d(e){var t=l,n="string"==typeof e?e:e.url;if(!t.test(n))return n;for(var o=t.exec(n),i=o[2].split(","),r=i[i.length-1],s=0,u=i.length;s<u;s++){var a=i[s];if(p[a]){r=a;break}}var c=n.replace(o[1],r);if("string"!=typeof e){var h=e;h.extension=r,h.url=c}return c}var f=function(){function e(){}return e.add=function(){e.setLegacy(r().useLegacy)},e.setLegacy=function(e){var n=c;e?n.forEach((function(e){t.LoaderResource.setExtensionXhrType(e,t.LoaderResource.XHR_RESPONSE_TYPE.DEFAULT),t.LoaderResource.setExtensionLoadType(e,t.LoaderResource.LOAD_TYPE.AUDIO)})):n.forEach((function(e){t.LoaderResource.setExtensionXhrType(e,t.LoaderResource.XHR_RESPONSE_TYPE.BUFFER),t.LoaderResource.setExtensionLoadType(e,t.LoaderResource.LOAD_TYPE.XHR)}))},e.pre=function(e,t){d(e),t()},e.use=function(e,t){e.data&&c.indexOf(e.extension)>-1?e.sound=r().add(e.name,{loaded:t,preload:!0,url:e.url,source:e.data}):t()},e}(),_=0,y=function(e){function t(t){var n=e.call(this)||this;return n.id=_++,n.init(t),n}return u(t,e),t.prototype.set=function(e,t){if(void 0===this[e])throw new Error("Property with name "+e+" does not exist.");switch(e){case"speed":this.speed=t;break;case"volume":this.volume=t;break;case"paused":this.paused=t;break;case"loop":this.loop=t;break;case"muted":this.muted=t}return this},Object.defineProperty(t.prototype,"progress",{get:function(){return this._source.currentTime/this._duration},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"paused",{get:function(){return this._paused},set:function(e){this._paused=e,this.refreshPaused()},enumerable:!1,configurable:!0}),t.prototype._onPlay=function(){this._playing=!0},t.prototype._onPause=function(){this._playing=!1},t.prototype.init=function(e){this._playing=!1,this._duration=e.source.duration;var t=this._source=e.source.cloneNode(!1);t.src=e.parent.url,t.onplay=this._onPlay.bind(this),t.onpause=this._onPause.bind(this),e.context.on("refresh",this.refresh,this),e.context.on("refreshPaused",this.refreshPaused,this),this._media=e},t.prototype._internalStop=function(){this._source&&this._playing&&(this._source.onended=null,this._source.pause())},t.prototype.stop=function(){this._internalStop(),this._source&&this.emit("stop")},Object.defineProperty(t.prototype,"speed",{get:function(){return this._speed},set:function(e){this._speed=e,this.refresh()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"volume",{get:function(){return this._volume},set:function(e){this._volume=e,this.refresh()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"loop",{get:function(){return this._loop},set:function(e){this._loop=e,this.refresh()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"muted",{get:function(){return this._muted},set:function(e){this._muted=e,this.refresh()},enumerable:!1,configurable:!0}),t.prototype.refresh=function(){var e=this._media.context,t=this._media.parent;this._source.loop=this._loop||t.loop;var n=e.volume*(e.muted?0:1),o=t.volume*(t.muted?0:1),i=this._volume*(this._muted?0:1);this._source.volume=i*n*o,this._source.playbackRate=this._speed*e.speed*t.speed},t.prototype.refreshPaused=function(){var e=this._media.context,t=this._media.parent,n=this._paused||t.paused||e.paused;n!==this._pausedReal&&(this._pausedReal=n,n?(this._internalStop(),this.emit("paused")):(this.emit("resumed"),this.play({start:this._source.currentTime,end:this._end,volume:this._volume,speed:this._speed,loop:this._loop})),this.emit("pause",n))},t.prototype.play=function(e){var n=this,i=e.start,r=e.end,s=e.speed,u=e.loop,a=e.volume,c=e.muted;this._speed=s,this._volume=a,this._loop=!!u,this._muted=c,this.refresh(),this.loop&&null!==r&&(this.loop=!1),this._start=i,this._end=r||this._duration,this._start=Math.max(0,this._start-t.PADDING),this._end=Math.min(this._end+t.PADDING,this._duration),this._source.onloadedmetadata=function(){n._source&&(n._source.currentTime=i,n._source.onloadedmetadata=null,n.emit("progress",i,n._duration),o.Ticker.shared.add(n._onUpdate,n))},this._source.onended=this._onComplete.bind(this),this._source.play(),this.emit("start")},t.prototype._onUpdate=function(){this.emit("progress",this.progress,this._duration),this._source.currentTime>=this._end&&!this._source.loop&&this._onComplete()},t.prototype._onComplete=function(){o.Ticker.shared.remove(this._onUpdate,this),this._internalStop(),this.emit("progress",1,this._duration),this.emit("end",this)},t.prototype.destroy=function(){o.Ticker.shared.remove(this._onUpdate,this),this.removeAllListeners();var e=this._source;e&&(e.onended=null,e.onplay=null,e.onpause=null,this._internalStop()),this._source=null,this._speed=1,this._volume=1,this._loop=!1,this._end=null,this._start=0,this._duration=0,this._playing=!1,this._pausedReal=!1,this._paused=!1,this._muted=!1,this._media&&(this._media.context.off("refresh",this.refresh,this),this._media.context.off("refreshPaused",this.refreshPaused,this),this._media=null)},t.prototype.toString=function(){return"[HTMLAudioInstance id="+this.id+"]"},t.PADDING=.1,t}(n.EventEmitter),m=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return u(t,e),t.prototype.init=function(e){this.parent=e,this._source=e.options.source||new Audio,e.url&&(this._source.src=e.url)},t.prototype.create=function(){return new y(this)},Object.defineProperty(t.prototype,"isPlayable",{get:function(){return!!this._source&&4===this._source.readyState},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"duration",{get:function(){return this._source.duration},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"context",{get:function(){return this.parent.context},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"filters",{get:function(){return null},set:function(e){},enumerable:!1,configurable:!0}),t.prototype.destroy=function(){this.removeAllListeners(),this.parent=null,this._source&&(this._source.src="",this._source.load(),this._source=null)},Object.defineProperty(t.prototype,"source",{get:function(){return this._source},enumerable:!1,configurable:!0}),t.prototype.load=function(e){var t=this._source,n=this.parent;if(4!==t.readyState)if(n.url){t.src=n.url;var o=function(){s(),n.isLoaded=!0;var t=n.autoPlayStart();e&&e(null,n,t)},i=function(){s(),e&&e(new Error("Sound loading has been aborted"))},r=function(){s();var n="Failed to load audio element (code: "+t.error.code+")";e&&e(new Error(n))},s=function(){t.removeEventListener("canplaythrough",o),t.removeEventListener("load",o),t.removeEventListener("abort",i),t.removeEventListener("error",r)};t.addEventListener("canplaythrough",o,!1),t.addEventListener("load",o,!1),t.addEventListener("abort",i,!1),t.addEventListener("error",r,!1),t.load()}else e(new Error("sound.url or sound.source must be set"));else{n.isLoaded=!0;var u=n.autoPlayStart();e&&setTimeout((function(){e(null,n,u)}),0)}},t}(n.EventEmitter),b=function(){function e(e,t){this.parent=e,Object.assign(this,t),this.duration=this.end-this.start}return e.prototype.play=function(e){return this.parent.play({complete:e,speed:this.speed||this.parent.speed,end:this.end,start:this.start,loop:this.loop})},e.prototype.destroy=function(){this.parent=null},e}(),g=function(){function e(){}return e.setParamValue=function(e,t){if(e.setValueAtTime){var n=r().context;e.setValueAtTime(t,n.audioContext.currentTime)}else e.value=t;return t},e}(),v=0,P=function(e){function t(t){var n=e.call(this)||this;return n.id=v++,n._media=null,n._paused=!1,n._muted=!1,n._elapsed=0,n.init(t),n}return u(t,e),t.prototype.set=function(e,t){if(void 0===this[e])throw new Error("Property with name "+e+" does not exist.");switch(e){case"speed":this.speed=t;break;case"volume":this.volume=t;break;case"muted":this.muted=t;break;case"loop":this.loop=t;break;case"paused":this.paused=t}return this},t.prototype.stop=function(){this._source&&(this._internalStop(),this.emit("stop"))},Object.defineProperty(t.prototype,"speed",{get:function(){return this._speed},set:function(e){this._speed=e,this.refresh(),this._update(!0)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"volume",{get:function(){return this._volume},set:function(e){this._volume=e,this.refresh()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"muted",{get:function(){return this._muted},set:function(e){this._muted=e,this.refresh()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"loop",{get:function(){return this._loop},set:function(e){this._loop=e,this.refresh()},enumerable:!1,configurable:!0}),t.prototype.refresh=function(){if(this._source){var e=this._media.context,t=this._media.parent;this._source.loop=this._loop||t.loop;var n=e.volume*(e.muted?0:1),o=t.volume*(t.muted?0:1),i=this._volume*(this._muted?0:1);g.setParamValue(this._gain.gain,i*o*n),g.setParamValue(this._source.playbackRate,this._speed*t.speed*e.speed)}},t.prototype.refreshPaused=function(){var e=this._media.context,t=this._media.parent,n=this._paused||t.paused||e.paused;n!==this._pausedReal&&(this._pausedReal=n,n?(this._internalStop(),this.emit("paused")):(this.emit("resumed"),this.play({start:this._elapsed%this._duration,end:this._end,speed:this._speed,loop:this._loop,volume:this._volume})),this.emit("pause",n))},t.prototype.play=function(e){var t=e.start,n=e.end,o=e.speed,i=e.loop,r=e.volume,s=e.muted;this._paused=!1;var u=this._media.nodes.cloneBufferSource(),a=u.source,c=u.gain;this._source=a,this._gain=c,this._speed=o,this._volume=r,this._loop=!!i,this._muted=s,this.refresh();var p=this._source.buffer.duration;this._duration=p,this._end=n,this._lastUpdate=this._now(),this._elapsed=t,this._source.onended=this._onComplete.bind(this),this._loop?(this._source.loopEnd=n,this._source.loopStart=t,this._source.start(0,t)):n?this._source.start(0,t,n-t):this._source.start(0,t),this.emit("start"),this._update(!0),this.enableTicker(!0)},t.prototype.enableTicker=function(e){o.Ticker.shared.remove(this._updateListener,this),e&&o.Ticker.shared.add(this._updateListener,this)},Object.defineProperty(t.prototype,"progress",{get:function(){return this._progress},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"paused",{get:function(){return this._paused},set:function(e){this._paused=e,this.refreshPaused()},enumerable:!1,configurable:!0}),t.prototype.destroy=function(){this.removeAllListeners(),this._internalStop(),this._gain&&(this._gain.disconnect(),this._gain=null),this._media&&(this._media.context.events.off("refresh",this.refresh,this),this._media.context.events.off("refreshPaused",this.refreshPaused,this),this._media=null),this._end=null,this._speed=1,this._volume=1,this._loop=!1,this._elapsed=0,this._duration=0,this._paused=!1,this._muted=!1,this._pausedReal=!1},t.prototype.toString=function(){return"[WebAudioInstance id="+this.id+"]"},t.prototype._now=function(){return this._media.context.audioContext.currentTime},t.prototype._updateListener=function(){this._update()},t.prototype._update=function(e){if(void 0===e&&(e=!1),this._source){var t=this._now(),n=t-this._lastUpdate;if(n>0||e){var o=this._source.playbackRate.value;this._elapsed+=n*o,this._lastUpdate=t;var i=this._duration,r=void 0;if(this._source.loopStart){var s=this._source.loopEnd-this._source.loopStart;r=(this._source.loopStart+this._elapsed%s)/i}else r=this._elapsed%i/i;this._progress=r,this.emit("progress",this._progress,i)}}},t.prototype.init=function(e){this._media=e,e.context.events.on("refresh",this.refresh,this),e.context.events.on("refreshPaused",this.refreshPaused,this)},t.prototype._internalStop=function(){this._source&&(this.enableTicker(!1),this._source.onended=null,this._source.stop(0),this._source.disconnect(),this._source=null)},t.prototype._onComplete=function(){this._source&&(this.enableTicker(!1),this._source.onended=null,this._source.disconnect()),this._source=null,this._progress=1,this.emit("progress",1,this._duration),this.emit("end",this)},t}(n.EventEmitter),x=function(){function e(e,t){this._output=t,this._input=e}return Object.defineProperty(e.prototype,"destination",{get:function(){return this._input},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"filters",{get:function(){return this._filters},set:function(e){var t=this;if(this._filters&&(this._filters.forEach((function(e){e&&e.disconnect()})),this._filters=null,this._input.connect(this._output)),e&&e.length){this._filters=e.slice(0),this._input.disconnect();var n=null;e.forEach((function(e){null===n?t._input.connect(e.destination):n.connect(e.destination),n=e})),n.connect(this._output)}},enumerable:!1,configurable:!0}),e.prototype.destroy=function(){this.filters=null,this._input=null,this._output=null},e}(),O=function(e){function t(t){var n=this,o=t.audioContext,i=o.createBufferSource(),r=o.createGain(),s=o.createAnalyser();return i.connect(s),s.connect(r),r.connect(t.destination),(n=e.call(this,s,r)||this).context=t,n.bufferSource=i,n.gain=r,n.analyser=s,n}return u(t,e),Object.defineProperty(t.prototype,"script",{get:function(){return this._script||(this._script=this.context.audioContext.createScriptProcessor(t.BUFFER_SIZE),this._script.connect(this.context.destination)),this._script},enumerable:!1,configurable:!0}),t.prototype.destroy=function(){e.prototype.destroy.call(this),this.bufferSource.disconnect(),this._script&&this._script.disconnect(),this.gain.disconnect(),this.analyser.disconnect(),this.bufferSource=null,this._script=null,this.gain=null,this.analyser=null,this.context=null},t.prototype.cloneBufferSource=function(){var e=this.bufferSource,t=this.context.audioContext.createBufferSource();t.buffer=e.buffer,g.setParamValue(t.playbackRate,e.playbackRate.value),t.loop=e.loop;var n=this.context.audioContext.createGain();return t.connect(n),n.connect(this.destination),{source:t,gain:n}},Object.defineProperty(t.prototype,"bufferSize",{get:function(){return this.script.bufferSize},enumerable:!1,configurable:!0}),t.BUFFER_SIZE=0,t}(x),j=function(){function e(){}return e.prototype.init=function(e){this.parent=e,this._nodes=new O(this.context),this._source=this._nodes.bufferSource,this.source=e.options.source},e.prototype.destroy=function(){this.parent=null,this._nodes.destroy(),this._nodes=null,this._source=null,this.source=null},e.prototype.create=function(){return new P(this)},Object.defineProperty(e.prototype,"context",{get:function(){return this.parent.context},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isPlayable",{get:function(){return!!this._source&&!!this._source.buffer},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"filters",{get:function(){return this._nodes.filters},set:function(e){this._nodes.filters=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"duration",{get:function(){return this._source.buffer.duration},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"buffer",{get:function(){return this._source.buffer},set:function(e){this._source.buffer=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"nodes",{get:function(){return this._nodes},enumerable:!1,configurable:!0}),e.prototype.load=function(e){this.source?this._decode(this.source,e):this.parent.url?this._loadUrl(e):e&&e(new Error("sound.url or sound.source must be set"))},e.prototype._loadUrl=function(e){var t=this,n=new XMLHttpRequest,o=this.parent.url;n.open("GET",o,!0),n.responseType="arraybuffer",n.onload=function(){t.source=n.response,t._decode(n.response,e)},n.send()},e.prototype._decode=function(e,t){var n=this;this.parent.context.decode(e,(function(e,o){if(e)t&&t(e);else{n.parent.isLoaded=!0,n.buffer=o;var i=n.parent.autoPlayStart();t&&t(null,n.parent,i)}}))},e}(),w=function(){function e(e,t){this.media=e,this.options=t,this._instances=[],this._sprites={},this.media.init(this);var n=t.complete;this._autoPlayOptions=n?{complete:n}:null,this.isLoaded=!1,this.isPlaying=!1,this.autoPlay=t.autoPlay,this.singleInstance=t.singleInstance,this.preload=t.preload||this.autoPlay,this.url=t.url,this.speed=t.speed,this.volume=t.volume,this.loop=t.loop,t.sprites&&this.addSprites(t.sprites),this.preload&&this._preload(t.loaded)}return e.from=function(t){var n={};return"string"==typeof t?n.url=t:t instanceof ArrayBuffer||t instanceof HTMLAudioElement?n.source=t:n=t,(n=a({autoPlay:!1,singleInstance:!1,url:null,source:null,preload:!1,volume:1,speed:1,complete:null,loaded:null,loop:!1},n)).url&&(n.url=d(n.url)),Object.freeze(n),new e(r().useLegacy?new m:new j,n)},Object.defineProperty(e.prototype,"context",{get:function(){return r().context},enumerable:!1,configurable:!0}),e.prototype.pause=function(){return this.isPlaying=!1,this.paused=!0,this},e.prototype.resume=function(){return this.isPlaying=this._instances.length>0,this.paused=!1,this},Object.defineProperty(e.prototype,"paused",{get:function(){return this._paused},set:function(e){this._paused=e,this.refreshPaused()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"speed",{get:function(){return this._speed},set:function(e){this._speed=e,this.refresh()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"filters",{get:function(){return this.media.filters},set:function(e){this.media.filters=e},enumerable:!1,configurable:!0}),e.prototype.addSprites=function(e,t){if("object"==typeof e){var n={};for(var o in e)n[o]=this.addSprites(o,e[o]);return n}var i=new b(this,t);return this._sprites[e]=i,i},e.prototype.destroy=function(){this._removeInstances(),this.removeSprites(),this.media.destroy(),this.media=null,this._sprites=null,this._instances=null},e.prototype.removeSprites=function(e){if(e){var t=this._sprites[e];void 0!==t&&(t.destroy(),delete this._sprites[e])}else for(var n in this._sprites)this.removeSprites(n);return this},Object.defineProperty(e.prototype,"isPlayable",{get:function(){return this.isLoaded&&this.media&&this.media.isPlayable},enumerable:!1,configurable:!0}),e.prototype.stop=function(){if(!this.isPlayable)return this.autoPlay=!1,this._autoPlayOptions=null,this;this.isPlaying=!1;for(var e=this._instances.length-1;e>=0;e--)this._instances[e].stop();return this},e.prototype.play=function(e,t){var n,o=this;"string"==typeof e?n={sprite:r=e,loop:this.loop,complete:t}:"function"==typeof e?(n={}).complete=e:n=e;if((n=a({complete:null,loaded:null,sprite:null,end:null,start:0,volume:1,speed:1,muted:!1,loop:!1},n||{})).sprite){var i=n.sprite,r=this._sprites[i];n.start=r.start,n.end=r.end,n.speed=r.speed||1,n.loop=r.loop||n.loop,delete n.sprite}if(n.offset&&(n.start=n.offset),!this.isLoaded)return new Promise((function(e,t){o.autoPlay=!0,o._autoPlayOptions=n,o._preload((function(o,i,r){o?t(o):(n.loaded&&n.loaded(o,i,r),e(r))}))}));this.singleInstance&&this._removeInstances();var s=this._createInstance();return this._instances.push(s),this.isPlaying=!0,s.once("end",(function(){n.complete&&n.complete(o),o._onComplete(s)})),s.once("stop",(function(){o._onComplete(s)})),s.play(n),s},e.prototype.refresh=function(){for(var e=this._instances.length,t=0;t<e;t++)this._instances[t].refresh()},e.prototype.refreshPaused=function(){for(var e=this._instances.length,t=0;t<e;t++)this._instances[t].refreshPaused()},Object.defineProperty(e.prototype,"volume",{get:function(){return this._volume},set:function(e){this._volume=e,this.refresh()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"muted",{get:function(){return this._muted},set:function(e){this._muted=e,this.refresh()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"loop",{get:function(){return this._loop},set:function(e){this._loop=e,this.refresh()},enumerable:!1,configurable:!0}),e.prototype._preload=function(e){this.media.load(e)},Object.defineProperty(e.prototype,"instances",{get:function(){return this._instances},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"sprites",{get:function(){return this._sprites},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"duration",{get:function(){return this.media.duration},enumerable:!1,configurable:!0}),e.prototype.autoPlayStart=function(){var e;return this.autoPlay&&(e=this.play(this._autoPlayOptions)),e},e.prototype._removeInstances=function(){for(var e=this._instances.length-1;e>=0;e--)this._poolInstance(this._instances[e]);this._instances.length=0},e.prototype._onComplete=function(e){if(this._instances){var t=this._instances.indexOf(e);t>-1&&this._instances.splice(t,1),this.isPlaying=this._instances.length>0}this._poolInstance(e)},e.prototype._createInstance=function(){if(e._pool.length>0){var t=e._pool.pop();return t.init(this.media),t}return this.media.create()},e.prototype._poolInstance=function(t){t.destroy(),e._pool.indexOf(t)<0&&e._pool.push(t)},e._pool=[],e}(),E=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.speed=1,t.muted=!1,t.volume=1,t.paused=!1,t}return u(t,e),t.prototype.refresh=function(){this.emit("refresh")},t.prototype.refreshPaused=function(){this.emit("refreshPaused")},Object.defineProperty(t.prototype,"filters",{get:function(){return null},set:function(e){},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"audioContext",{get:function(){return null},enumerable:!1,configurable:!0}),t.prototype.toggleMute=function(){return this.muted=!this.muted,this.refresh(),this.muted},t.prototype.togglePause=function(){return this.paused=!this.paused,this.refreshPaused(),this.paused},t.prototype.destroy=function(){this.removeAllListeners()},t}(n.EventEmitter),L=function(e){function t(){var o=this,i=window,r=new t.AudioContext,s=r.createDynamicsCompressor(),u=r.createAnalyser();return u.connect(s),s.connect(r.destination),(o=e.call(this,u,s)||this)._ctx=r,o._offlineCtx=new t.OfflineAudioContext(1,2,i.OfflineAudioContext?r.sampleRate:44100),o._unlocked=!1,o.compressor=s,o.analyser=u,o.events=new n.EventEmitter,o.volume=1,o.speed=1,o.muted=!1,o.paused=!1,"running"!==r.state&&(o._unlock(),o._unlock=o._unlock.bind(o),document.addEventListener("mousedown",o._unlock,!0),document.addEventListener("touchstart",o._unlock,!0),document.addEventListener("touchend",o._unlock,!0)),o}return u(t,e),t.prototype._unlock=function(){this._unlocked||(this.playEmptySound(),"running"===this._ctx.state&&(document.removeEventListener("mousedown",this._unlock,!0),document.removeEventListener("touchend",this._unlock,!0),document.removeEventListener("touchstart",this._unlock,!0),this._unlocked=!0))},t.prototype.playEmptySound=function(){var e=this._ctx.createBufferSource();e.buffer=this._ctx.createBuffer(1,1,22050),e.connect(this._ctx.destination),e.start(0,0,0),"suspended"===e.context.state&&e.context.resume()},Object.defineProperty(t,"AudioContext",{get:function(){var e=window;return e.AudioContext||e.webkitAudioContext||null},enumerable:!1,configurable:!0}),Object.defineProperty(t,"OfflineAudioContext",{get:function(){var e=window;return e.OfflineAudioContext||e.webkitOfflineAudioContext||null},enumerable:!1,configurable:!0}),t.prototype.destroy=function(){e.prototype.destroy.call(this);var t=this._ctx;void 0!==t.close&&t.close(),this.events.removeAllListeners(),this.analyser.disconnect(),this.compressor.disconnect(),this.analyser=null,this.compressor=null,this.events=null,this._offlineCtx=null,this._ctx=null},Object.defineProperty(t.prototype,"audioContext",{get:function(){return this._ctx},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"offlineContext",{get:function(){return this._offlineCtx},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"paused",{get:function(){return this._paused},set:function(e){e&&"running"===this._ctx.state?this._ctx.suspend():e||"suspended"!==this._ctx.state||this._ctx.resume(),this._paused=e},enumerable:!1,configurable:!0}),t.prototype.refresh=function(){this.events.emit("refresh")},t.prototype.refreshPaused=function(){this.events.emit("refreshPaused")},t.prototype.toggleMute=function(){return this.muted=!this.muted,this.refresh(),this.muted},t.prototype.togglePause=function(){return this.paused=!this.paused,this.refreshPaused(),this._paused},t.prototype.decode=function(e,t){var n=function(e){t(new Error(e.message||"Unable to decode file"))},o=this._offlineCtx.decodeAudioData(e,(function(e){t(null,e)}),n);o&&o.catch(n)},t}(x),A=function(){function e(){this.init()}return e.prototype.init=function(){return this.supported&&(this._webAudioContext=new L),this._htmlAudioContext=new E,this._sounds={},this.useLegacy=!this.supported,this},Object.defineProperty(e.prototype,"context",{get:function(){return this._context},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"filtersAll",{get:function(){return this.useLegacy?[]:this._context.filters},set:function(e){this.useLegacy||(this._context.filters=e)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"supported",{get:function(){return null!==L.AudioContext},enumerable:!1,configurable:!0}),e.prototype.add=function(e,t){if("object"==typeof e){var n={};for(var o in e){var i=this._getOptions(e[o],t);n[o]=this.add(o,i)}return n}if(t instanceof w)return this._sounds[e]=t,t;var r=this._getOptions(t),s=w.from(r);return this._sounds[e]=s,s},e.prototype._getOptions=function(e,t){var n;return n="string"==typeof e?{url:e}:e instanceof ArrayBuffer||e instanceof HTMLAudioElement?{source:e}:e,n=a(a({},n),t||{})},Object.defineProperty(e.prototype,"useLegacy",{get:function(){return this._useLegacy},set:function(e){f.setLegacy(e),this._useLegacy=e,this._context=!e&&this.supported?this._webAudioContext:this._htmlAudioContext},enumerable:!1,configurable:!0}),e.prototype.remove=function(e){return this.exists(e,!0),this._sounds[e].destroy(),delete this._sounds[e],this},Object.defineProperty(e.prototype,"volumeAll",{get:function(){return this._context.volume},set:function(e){this._context.volume=e,this._context.refresh()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"speedAll",{get:function(){return this._context.speed},set:function(e){this._context.speed=e,this._context.refresh()},enumerable:!1,configurable:!0}),e.prototype.togglePauseAll=function(){return this._context.togglePause()},e.prototype.pauseAll=function(){return this._context.paused=!0,this._context.refreshPaused(),this},e.prototype.resumeAll=function(){return this._context.paused=!1,this._context.refreshPaused(),this},e.prototype.toggleMuteAll=function(){return this._context.toggleMute()},e.prototype.muteAll=function(){return this._context.muted=!0,this._context.refresh(),this},e.prototype.unmuteAll=function(){return this._context.muted=!1,this._context.refresh(),this},e.prototype.removeAll=function(){for(var e in this._sounds)this._sounds[e].destroy(),delete this._sounds[e];return this},e.prototype.stopAll=function(){for(var e in this._sounds)this._sounds[e].stop();return this},e.prototype.exists=function(e,t){return void 0===t&&(t=!1),!!this._sounds[e]},e.prototype.find=function(e){return this.exists(e,!0),this._sounds[e]},e.prototype.play=function(e,t){return this.find(e).play(t)},e.prototype.stop=function(e){return this.find(e).stop()},e.prototype.pause=function(e){return this.find(e).pause()},e.prototype.resume=function(e){return this.find(e).resume()},e.prototype.volume=function(e,t){var n=this.find(e);return void 0!==t&&(n.volume=t),n.volume},e.prototype.speed=function(e,t){var n=this.find(e);return void 0!==t&&(n.speed=t),n.speed},e.prototype.duration=function(e){return this.find(e).duration},e.prototype.close=function(){return this.removeAll(),this._sounds=null,this._webAudioContext&&(this._webAudioContext.destroy(),this._webAudioContext=null),this._htmlAudioContext&&(this._htmlAudioContext.destroy(),this._htmlAudioContext=null),this._context=null,this},e}(),F={HTMLAudioContext:E,HTMLAudioMedia:m,HTMLAudioInstance:y},C=function(){function e(e,t){this.init(e,t)}return e.prototype.init=function(e,t){this.destination=e,this.source=t||e},e.prototype.connect=function(e){this.source.connect(e)},e.prototype.disconnect=function(){this.source.disconnect()},e.prototype.destroy=function(){this.disconnect(),this.destination=null,this.source=null},e}(),S={Filter:C,EqualizerFilter:function(e){function t(n,o,i,s,u,a,c,p,h,l){void 0===n&&(n=0),void 0===o&&(o=0),void 0===i&&(i=0),void 0===s&&(s=0),void 0===u&&(u=0),void 0===a&&(a=0),void 0===c&&(c=0),void 0===p&&(p=0),void 0===h&&(h=0),void 0===l&&(l=0);var d=this;if(!r().useLegacy){var f=[{f:t.F32,type:"lowshelf",gain:n},{f:t.F64,type:"peaking",gain:o},{f:t.F125,type:"peaking",gain:i},{f:t.F250,type:"peaking",gain:s},{f:t.F500,type:"peaking",gain:u},{f:t.F1K,type:"peaking",gain:a},{f:t.F2K,type:"peaking",gain:c},{f:t.F4K,type:"peaking",gain:p},{f:t.F8K,type:"peaking",gain:h},{f:t.F16K,type:"highshelf",gain:l}].map((function(e){var t=r().context.audioContext.createBiquadFilter();return t.type=e.type,g.setParamValue(t.Q,1),t.frequency.value=e.f,g.setParamValue(t.gain,e.gain),t}));(d=e.call(this,f[0],f[f.length-1])||this).bands=f,d.bandsMap={};for(var _=0;_<d.bands.length;_++){var y=d.bands[_];_>0&&d.bands[_-1].connect(y),d.bandsMap[y.frequency.value]=y}return d}d=e.call(this,null)||this}return u(t,e),t.prototype.setGain=function(e,t){if(void 0===t&&(t=0),!this.bandsMap[e])throw new Error("No band found for frequency "+e);g.setParamValue(this.bandsMap[e].gain,t)},t.prototype.getGain=function(e){if(!this.bandsMap[e])throw new Error("No band found for frequency "+e);return this.bandsMap[e].gain.value},Object.defineProperty(t.prototype,"f32",{get:function(){return this.getGain(t.F32)},set:function(e){this.setGain(t.F32,e)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"f64",{get:function(){return this.getGain(t.F64)},set:function(e){this.setGain(t.F64,e)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"f125",{get:function(){return this.getGain(t.F125)},set:function(e){this.setGain(t.F125,e)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"f250",{get:function(){return this.getGain(t.F250)},set:function(e){this.setGain(t.F250,e)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"f500",{get:function(){return this.getGain(t.F500)},set:function(e){this.setGain(t.F500,e)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"f1k",{get:function(){return this.getGain(t.F1K)},set:function(e){this.setGain(t.F1K,e)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"f2k",{get:function(){return this.getGain(t.F2K)},set:function(e){this.setGain(t.F2K,e)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"f4k",{get:function(){return this.getGain(t.F4K)},set:function(e){this.setGain(t.F4K,e)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"f8k",{get:function(){return this.getGain(t.F8K)},set:function(e){this.setGain(t.F8K,e)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"f16k",{get:function(){return this.getGain(t.F16K)},set:function(e){this.setGain(t.F16K,e)},enumerable:!1,configurable:!0}),t.prototype.reset=function(){this.bands.forEach((function(e){g.setParamValue(e.gain,0)}))},t.prototype.destroy=function(){this.bands.forEach((function(e){e.disconnect()})),this.bands=null,this.bandsMap=null},t.F32=32,t.F64=64,t.F125=125,t.F250=250,t.F500=500,t.F1K=1e3,t.F2K=2e3,t.F4K=4e3,t.F8K=8e3,t.F16K=16e3,t}(C),DistortionFilter:function(e){function t(t){void 0===t&&(t=0);var n=this;if(!r().useLegacy){var o=r().context.audioContext.createWaveShaper();return(n=e.call(this,o)||this)._distortion=o,n.amount=t,n}n=e.call(this,null)||this}return u(t,e),Object.defineProperty(t.prototype,"amount",{get:function(){return this._amount},set:function(e){e*=1e3,this._amount=e;for(var t,n=44100,o=new Float32Array(n),i=Math.PI/180,r=0;r<n;++r)t=2*r/n-1,o[r]=(3+e)*t*20*i/(Math.PI+e*Math.abs(t));this._distortion.curve=o,this._distortion.oversample="4x"},enumerable:!1,configurable:!0}),t.prototype.destroy=function(){this._distortion=null,e.prototype.destroy.call(this)},t}(C),StereoFilter:function(e){function t(t){void 0===t&&(t=0);var n=this;if(!r().useLegacy){var o,i,s,u=r().context.audioContext;return u.createStereoPanner?s=o=u.createStereoPanner():((i=u.createPanner()).panningModel="equalpower",s=i),(n=e.call(this,s)||this)._stereo=o,n._panner=i,n.pan=t,n}n=e.call(this,null)||this}return u(t,e),Object.defineProperty(t.prototype,"pan",{get:function(){return this._pan},set:function(e){this._pan=e,this._stereo?g.setParamValue(this._stereo.pan,e):this._panner.setPosition(e,0,1-Math.abs(e))},enumerable:!1,configurable:!0}),t.prototype.destroy=function(){e.prototype.destroy.call(this),this._stereo=null,this._panner=null},t}(C),ReverbFilter:function(e){function t(t,n,o){void 0===t&&(t=3),void 0===n&&(n=2),void 0===o&&(o=!1);var i=this;if(!r().useLegacy)return(i=e.call(this,null)||this)._seconds=i._clamp(t,1,50),i._decay=i._clamp(n,0,100),i._reverse=o,i._rebuild(),i;i=e.call(this,null)||this}return u(t,e),t.prototype._clamp=function(e,t,n){return Math.min(n,Math.max(t,e))},Object.defineProperty(t.prototype,"seconds",{get:function(){return this._seconds},set:function(e){this._seconds=this._clamp(e,1,50),this._rebuild()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"decay",{get:function(){return this._decay},set:function(e){this._decay=this._clamp(e,0,100),this._rebuild()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"reverse",{get:function(){return this._reverse},set:function(e){this._reverse=e,this._rebuild()},enumerable:!1,configurable:!0}),t.prototype._rebuild=function(){for(var e,t=r().context.audioContext,n=t.sampleRate,o=n*this._seconds,i=t.createBuffer(2,o,n),s=i.getChannelData(0),u=i.getChannelData(1),a=0;a<o;a++)e=this._reverse?o-a:a,s[a]=(2*Math.random()-1)*Math.pow(1-e/o,this._decay),u[a]=(2*Math.random()-1)*Math.pow(1-e/o,this._decay);var c=r().context.audioContext.createConvolver();c.buffer=i,this.init(c)},t}(C),MonoFilter:function(e){function t(){var t=this;if(!r().useLegacy){var n=r().context.audioContext,o=n.createChannelSplitter(),i=n.createChannelMerger();return i.connect(o),(t=e.call(this,i,o)||this)._merger=i,t}t=e.call(this,null)||this}return u(t,e),t.prototype.destroy=function(){this._merger.disconnect(),this._merger=null,e.prototype.destroy.call(this)},t}(C),TelephoneFilter:function(e){function t(){if(!r().useLegacy){var t=r().context.audioContext,n=t.createBiquadFilter(),o=t.createBiquadFilter(),i=t.createBiquadFilter(),s=t.createBiquadFilter();return n.type="lowpass",g.setParamValue(n.frequency,2e3),o.type="lowpass",g.setParamValue(o.frequency,2e3),i.type="highpass",g.setParamValue(i.frequency,500),s.type="highpass",g.setParamValue(s.frequency,500),n.connect(o),o.connect(i),i.connect(s),e.call(this,n,s)||this}e.call(this,null)}return u(t,e),t}(C)},k={WebAudioMedia:j,WebAudioInstance:P,WebAudioNodes:O,WebAudioContext:L,WebAudioUtils:g},T=0;var M={playOnce:function(e,t){var n="alias"+T++;return r().add(n,{url:e,preload:!0,autoPlay:!0,loaded:function(e){e&&(r().remove(n),t&&t(e))},complete:function(){r().remove(n),t&&t(null)}}),n},render:function(e,t){var n=document.createElement("canvas");t=a({width:512,height:128,fill:"black"},t||{}),n.width=t.width,n.height=t.height;var o=i.BaseTexture.from(n);if(!(e.media instanceof j))return o;var r=e.media,s=n.getContext("2d");s.fillStyle=t.fill;for(var u=r.buffer.getChannelData(0),c=Math.ceil(u.length/t.width),p=t.height/2,h=0;h<t.width;h++){for(var l=1,d=-1,f=0;f<c;f++){var _=u[h*c+f];_<l&&(l=_),_>d&&(d=_)}s.fillRect(h,(1+l)*p,1,Math.max(1,(d-l)*p))}return o},resolveUrl:d,sineTone:function(e,t){void 0===e&&(e=200),void 0===t&&(t=1);var n=w.from({singleInstance:!0});if(!(n.media instanceof j))return n;for(var o=n.media,i=n.context.audioContext.createBuffer(1,48e3*t,48e3),r=i.getChannelData(0),s=0;s<r.length;s++){var u=e*(s/i.sampleRate)*Math.PI;r[s]=2*Math.sin(u)}return o.buffer=i,n.isLoaded=!0,n},supported:p,extensions:c,validateFormats:h},R=function(t){return e=t,t}(new A);t.Loader.registerPlugin(f),exports.Filter=C,exports.Filterable=x,exports.Sound=w,exports.SoundLibrary=A,exports.SoundLoader=f,exports.SoundSprite=b,exports.filters=S,exports.htmlaudio=F,exports.sound=R,exports.utils=M,exports.webaudio=k;
//# sourceMappingURL=pixi-sound.cjs.js.map
